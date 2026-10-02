namespace("spawn_")

var spawn_powerTeamBest = 0;
const spawn_multiTechLevel = getMultiTechLevel();
const spawn_MIN_COST = 30; // Scavenger units are too cheap; enforce a minimum

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

	// The enemy's target power obeys a minimum that rises linearly and takes
	// effect only in late game. This keeps pressure on a stable defense.
	const powerTarget = (() =>
	{
		const G = (gameTime >> 13) * derrickPositions.length;
		const minimum = Math.floor(G * timeMultiplier);
		return Math.max(minimum, Math.floor(powerTeam * adjustment));
	})();

	// Allocate enough budget to reach the target power.
	let enemyBudget = powerTarget - spawn_getPowerEnemy();

	// The frontier represents the latest enemy template that can appear and is
	// measured as time in minutes.
	const frontier = (() =>
	{
		if (spawn_multiTechLevel === 4)
		{
			return TEMPLATES.length;
		}

		// The frontier is determined by the team's research progress, not
		// elapsed time. This prevents the enemy from out-pacing the team.
		let seconds = LATEST_RESEARCH.minimumResearchTime;

		// As time passes, gradually unhandicap the enemy.
		const lagTime = gameTime - LATEST_RESEARCH.gameTime;
		const lagTimeSeconds = Math.floor(lagTime / 1000);
		seconds += Math.floor(lagTimeSeconds * timeMultiplier);

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
			if (droid.droidType === DROID_WEAPON || droid.droidType === DROID_CYBORG || droid.droidType === DROID_PERSON)
			{
				power += droid.cost;
			}
		}
		for (const structure of enumStruct(player, DEFENSE))
		{
			if (structure.status === BUILT && structure.canHitGround)
			{
				if (structure.cost === 1250) // Heavy Rocket Bastion
				{
					power += structure.cost * 5;
				}
				else if (structure.cost === 1600) // Missile Fortress
				{
					power += structure.cost * 7;
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

// Calculate the time multiplier from current gameTime.
// The multiplier starts at 0.0 and grows with time to 1.0 at a quadratic rate.
function spawn_getTimeMultiplier()
{
	const minutes = Math.floor((gameTime / 1000) / 60);

	// y = x^2 / 90^2
	const y = (minutes * minutes) / (80 * 80); // reach 1.0 at 80 minutes

	// Do not exceed 1.0
	return Math.min(1, y);
}
