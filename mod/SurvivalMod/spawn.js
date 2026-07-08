namespace("spawn_")

function spawn_eventStartLevel()
{
	queue("spawn_tick", 60 * 1000);
}

function spawn_tick()
{
	if (spawn_positions.length === 0)
	{
		return;
	}

	// Calculate team power
	let powerAllies = 0;
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player !== ENEMY)
		{
			for (const droid of enumDroid(player))
			{
				if (droid.droidType === DROID_WEAPON || droid.droidType === DROID_CYBORG)
				{
					powerAllies += droid.cost;
				}
			}
			for (const structure of enumStruct(player))
			{
				if (structure.stattype === DEFENSE && structure.status === BUILT)
				{
					if (structure.cost >= 1000) // probably a fortress
					{
						powerAllies += Math.ceil(structure.cost ** 1.1);
					}
					else
					{
						powerAllies += structure.cost;
					}
				}
			}
		}
	}

	// Halve the calculated team power, for balance reasons
	powerAllies = Math.floor(spawn_difficulty * powerAllies);

	// Slowly increase difficulty over time
	const numOils = derrickPositions.length;
	const numPlayers = maxPlayers - 1;
	const maxOils = 40 * numPlayers; // Power is limited by max power generator count (10 * 4)
	const k = Math.min(numOils, maxOils);
	powerAllies += (k * gameTime) >> 16;

	// Calculate enemy power
	let powerEnemy = 0;
	for (const droid of enumDroid(ENEMY))
	{
		powerEnemy += Math.max(15, droid.cost);
	}

	// Add enemies until the power exceeds the human players
	const minute = TECH_TIME === null ? TEMPLATES.length : Math.min(TEMPLATES.length, Math.floor(TECH_TIME / 60));
	while (powerEnemy < powerAllies)
	{
		const template = TEMPLATES[syncRandom(minute)];
		if (template)
		{
			const [x, y] = spawn_positions[syncRandom(spawn_positions.length)];
			hackNetOff();
			const droid = addDroid(ENEMY, x, y, template.name, template.body, template.propulsion, "", "", ...template.turrets);
			hackNetOn();

			powerEnemy += Math.max(15, droid.cost);
		}
	}

	queue("spawn_tick", 60 * 1000);
}

const spawn_difficulty = (() =>
{
	switch (playerData[ENEMY].difficulty)
	{
		case INSANE: return 0.9;
		case HARD  : return 0.7;
		case MEDIUM: return 0.5;
		case EASY  : return 0.3;
		default    : return 0.3;
	}
})();

var spawn_positions = (() => {
	const startTiles = [];
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player === ENEMY)
		{
			continue;
		}
		const { x, y } = startPositions[player];
		startTiles.push(MapTiles[y][x]);
	}

	const limitedPositions = spawn_getPositions((x, y) =>
	{
		return startTiles.some(t => t.limitedContinent === MapTiles[y][x].limitedContinent);
	});

	if (limitedPositions.length === 0)
	{
		return spawn_getPositions((x, y) =>
		{
			return startTiles.some(t => t.hoverContinent === MapTiles[y][x].hoverContinent);
		});
	}

	return limitedPositions;
})();

function spawn_getPositions(filter)
{
	const positions = [];

	// North
	for (let x = 1; x < mapWidth - 1; x++)
	{
		const y = 1;
		if (filter(x, y))
		{
			positions.push([x, y]);
		}
	}
	// South
	for (let x = 1; x < mapWidth - 1; x++)
	{
		const y = mapHeight - 2;
		if (filter(x, y))
		{
			positions.push([x, y]);
		}
	}
	// West
	for (let y = 2; y < mapHeight - 1; y++)
	{
		const x = 1;
		if (filter(x, y))
		{
			positions.push([x, y]);
		}
	}
	// East
	for (let y = 2; y < mapHeight - 1; y++)
	{
		const x = mapWidth - 2;
		if (filter(x, y))
		{
			positions.push([x, y]);
		}
	}

	return positions;
}
