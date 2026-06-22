# Usage:
# python3 make.py /path/to/TEMPLATES.js

import re
import json
import sys
import requests
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from pathlib import Path

# ---------------------------------------------------------------------------
# Parse TEMPLATES.js  (JS syntax → Python list)
# ---------------------------------------------------------------------------
def load_templates_js(path="TEMPLATES.js"):
    src = Path(path).read_text()

    # Strip the JS variable wrapper: "const TEMPLATES = [ ... ];"
    src = re.sub(r"^\s*const\s+TEMPLATES\s*=\s*", "", src, flags=re.DOTALL)
    src = re.sub(r"\s*;\s*$", "", src.strip())

    # Quote bare JS keys  (word chars before a colon that isn't inside a string)
    src = re.sub(r'(?<!["\w])(\b[a-zA-Z_]\w*\b)\s*:', r'"\1":', src)

    # JS null → JSON null (already valid JSON)
    # JS comments — strip // lines
    src = re.sub(r"//[^\n]*", "", src)

    # Trailing commas before ] or }  (not valid JSON)
    src = re.sub(r",\s*([}\]])", r"\1", src)

    data = json.loads(src)
    # Convert JSON nulls (None in Python) and dicts to our template format
    templates = []
    for item in data:
        if item is None:
            templates.append(None)
        else:
            templates.append({
                "turrets":    item["turrets"],
                "body":       item["body"],
                "propulsion": item["propulsion"],
                "name":       item.get("name", ""),
            })
    return templates

js_path = sys.argv[1] if len(sys.argv) > 1 else "TEMPLATES.js"
TEMPLATES = load_templates_js(js_path)
print(f"Loaded {len(TEMPLATES)} templates from {js_path}")

# ---------------------------------------------------------------------------
# Fetch game data
# ---------------------------------------------------------------------------
BASE = "https://raw.githubusercontent.com/Warzone2100/warzone2100/master/data/mp/stats"
weapons = requests.get(f"{BASE}/weapons.json").json()
bodies  = requests.get(f"{BASE}/body.json").json()
props   = requests.get(f"{BASE}/propulsion.json").json()

# ---------------------------------------------------------------------------
# Stat calculations per template
# ---------------------------------------------------------------------------
def template_hp(t):
    if t is None:
        return 0
    body_data = bodies[t["body"]]
    prop_data = props[t["propulsion"]]
    body_hp   = body_data.get("hitpoints", 0)
    prop_pct  = prop_data.get("hitpointPctOfBody", 0)
    prop_hp   = body_hp * prop_pct / 100
    weapon_hp = sum(weapons[wid].get("hitpoints", 0) for wid in t["turrets"])
    return body_hp + prop_hp + weapon_hp

def template_build_power(t):
    if t is None:
        return 0
    bp  = sum(weapons[wid].get("buildPower", 0) for wid in t["turrets"])
    bp += bodies[t["body"]].get("buildPower", 0)
    bp += props[t["propulsion"]].get("buildPower", 0)
    return bp

template_hps = [template_hp(t) for t in TEMPLATES]
template_bps = [template_build_power(t) for t in TEMPLATES]

# ---------------------------------------------------------------------------
# Per-minute averages
# At minute N, indexes 0..N (inclusive) are selectable uniformly.
# ---------------------------------------------------------------------------
N_MINUTES = len(TEMPLATES)

minutes = list(range(N_MINUTES))
avg_hps = []
avg_bps = []

for minute in minutes:
    pool_hp = template_hps[: minute + 1]
    pool_bp = template_bps[: minute + 1]
    avg_hps.append(sum(pool_hp) / len(pool_hp))
    avg_bps.append(sum(pool_bp) / len(pool_bp))

# ---------------------------------------------------------------------------
# Print per-template breakdown for reference
# ---------------------------------------------------------------------------
print(f"{'Idx':>3}  {'Name':<45}  {'HP':>8}  {'BuildPwr':>10}")
print("-" * 73)
for i, t in enumerate(TEMPLATES):
    name = t["name"] if t else "(null — no spawn)"
    print(f"{i:>3}  {name:<45}  {template_hps[i]:>8.0f}  {template_bps[i]:>10.0f}")

# ---------------------------------------------------------------------------
# Plot
# ---------------------------------------------------------------------------
HP_COLOR = "#e06c1d"
BP_COLOR = "#3a9bd5"

fig, ax = plt.subplots(figsize=(10, 5))
ax2 = ax.twinx()

# HP line (left axis)
ax.plot(minutes, avg_hps, color=HP_COLOR, linewidth=1, label="Avg HP", zorder=3)
ax.fill_between(minutes, avg_hps, alpha=0.10, color=HP_COLOR)

# Build power line (right axis)
ax2.plot(minutes, avg_bps, color=BP_COLOR, linewidth=1, label="Avg Build Power", zorder=3)

# Axes labels & formatting
ax.set_xlabel("Time (minutes)", fontsize=12)
ax.tick_params(axis="y", labelcolor=HP_COLOR)
ax2.tick_params(axis="y", labelcolor=BP_COLOR)

ax.set_title("Warzone 2100 — Difficulty Scaling by Minute", fontsize=13)
ax.xaxis.set_major_locator(ticker.MultipleLocator(10))
ax.xaxis.set_minor_locator(ticker.MultipleLocator(1))
ax.tick_params(axis="x")
ax.yaxis.set_major_formatter(ticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))
ax2.yaxis.set_major_formatter(ticker.FuncFormatter(lambda v, _: f"{v:,.0f}"))

ax.set_xlim(-0.3, N_MINUTES - 0.7)
ax.set_ylim(0)
ax2.set_ylim(0)

ax.grid(axis="y", linestyle="--", alpha=0.3)
ax.grid(axis="x", which="major", alpha=0.4)
ax.grid(axis="x", which="minor", alpha=0.15)

# Combined legend
lines1, labels1 = ax.get_legend_handles_labels()
lines2, labels2 = ax2.get_legend_handles_labels()
ax.legend(lines1 + lines2, labels1 + labels2, loc="upper left", fontsize=10)

plt.tight_layout()
plt.savefig("wz2100_difficulty.svg")
plt.show()
print("\nSaved to wz2100_difficulty.svg")
