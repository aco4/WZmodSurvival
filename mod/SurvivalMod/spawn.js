namespace("spawn_")

var spawn_powerTeamBest = 0;
const spawn_MULTI_TECH_LEVEL = getMultiTechLevel();
const spawn_MIN_COST = 30; // Scavenger units are too cheap; enforce a minimum
// How long should the game last? This is guidance, not a limit.
const spawn_GAME_DURATION = (() =>
{
	// Instead of picking the duration arbitrarily, base it on the minimum
	// research time of the last technology.
	const mrt = includeJSON("minimumResearchTime.json");
	const seconds = Object.values(mrt).reduce((acc, curr) => Math.max(acc, curr), 0);
	const minutes = Math.ceil(seconds / 50); // Apply 20% extra duration
	return Math.max(1, minutes); // Must be at least 1 minute
})();

function spawn_eventStartLevel()
{
	if (ENTRANCES.length > 0)
	{
		setTimer("spawn_tick", 5 * 1000);
	}
}

function spawn_tick()
{
	const powerTeam = spawn_getPowerTeam();
	if (powerTeam > spawn_powerTeamBest)
	{
		spawn_powerTeamBest = powerTeam;
	}

	const timeMultiplier = spawn_getTimeMultiplier();

	// When the team is underperforming, reduce their perceived power so the
	// enemy allocates less budget. The adjustment starts at 1.0 and strengthens
	// quadratically as the team falls below their best. The minimum that rises
	// over time exists to gradually erase the adjustment.
	const adjustment = Math.max(timeMultiplier,
		(powerTeam / spawn_powerTeamBest)**2
	);

	const enemyTargetPower = (() =>
	{
		const gameTimeSeconds = Math.floor(gameTime / 1000);
		const gameTimeMinutes = Math.floor(gameTimeSeconds / 60);
		const lateGameMultiplier = Math.max(1, gameTimeMinutes / spawn_GAME_DURATION);

		return Math.floor(powerTeam * adjustment * lateGameMultiplier);
	})();

	// Allocate enough budget to reach the target power.
	let enemyBudget = enemyTargetPower - spawn_getPowerEnemy();

	// Don't allow the enemy to instantly respawn 100% of their army
	enemyBudget = enemyBudget >> 2; // divide by 4

	// The frontier represents the latest enemy template that can appear and is
	// measured as time in minutes.
	// The frontier is determined by the team's research progress, not elapsed
	// time. This prevents the enemy from out-pacing the team.
	const frontier = (() =>
	{
		if (spawn_MULTI_TECH_LEVEL === 4)
		{
			return TEMPLATES.length;
		}

		// As time passes, gradually unhandicap the enemy.
		const timeDifference = STARTING_RESEARCH_OFFSET + Math.floor(gameTime / 1000) - LATEST_RESEARCH_SECONDS;
		const seconds = LATEST_RESEARCH_SECONDS + Math.floor(timeDifference * timeMultiplier);

		return Math.min(TEMPLATES.length, Math.floor(seconds / 60));
	})();

	while (enemyBudget > 0)
	{
		// Favor newer templates: Pick twice, then take the max.
		const a = syncRandom(frontier);
		const b = syncRandom(frontier);
		const i = Math.max(a, b);

		const template = TEMPLATES[i];
		const [x, y] = ENTRANCES[syncRandom(ENTRANCES.length)];
		const droid = addDroid(ENEMY, x, y, "Enemy", template.body, template.propulsion, "", "", ...template.turrets);

		enemyBudget -= Math.max(spawn_MIN_COST, droid.cost);
	}
}

function spawn_getPowerTeam()
{
	let power = 0;
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player === ENEMY)
		{
			continue;
		}
		for (const droid of enumDroid(player, DROID_WEAPON))
		{
			// Unarmed VTOL count for less
			if (droid.isVTOL && droid.weapons[0].armed === 0)
			{
				power += droid.cost >> 1; // divide by 2
			}
			else if (droid.droidType === DROID_WEAPON || droid.droidType === DROID_CYBORG || droid.droidType === DROID_PERSON)
			{
				power += droid.cost;
			}
		}
		for (const structure of enumStruct(player, DEFENSE))
		{
			if (structure.status === BUILT && structure.canHitGround)
			{
				// Fortresses count for more
				if (structure.cost > 1000)
				{
					power += 17 * structure.cost - 16000;
				}
				else
				{
					power += structure.cost;
				}
			}
		}
	}
	return power;
}

function spawn_getPowerEnemy()
{
	let power = 0;
	for (const droid of enumDroid(ENEMY, DROID_ANY))
	{
		power += Math.max(spawn_MIN_COST, droid.cost);
	}
	return power;
}

// Calculate the time multiplier from (1) current gameTime and (2) the end time.
// The multiplier starts at 0.0 and grows with time to 1.0 at a quadratic rate.
function spawn_getTimeMultiplier()
{
	const x = Math.floor((gameTime / 1000) / 60);
	const C = spawn_GAME_DURATION;
	const y = (x * x) / (C * C); // reach 1.0 when time == C

	// Do not exceed 1.0
	return Math.min(1, y);
}
