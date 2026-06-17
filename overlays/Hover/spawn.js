namespace("spawn_")

function spawn_eventMissionTimeout()
{
	queue("spawn_tick");
}

function spawn_tick()
{
	if (spawn_positions.length === 0)
	{
		return;
	}
	const minute = Math.ceil(gameTime / 1000 / 60);
	const length = Math.min(TEMPLATES.length, minute);

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
				if (structure.stattype === DEFENSE)
				{
					powerAllies += Math.floor((structure.cost)**1.03);
				}
			}
		}
	}

	// Calculate enemy power
	let powerEnemy = 0;
	const enemy_droids = enumDroid(ENEMY);
	for (const droid of enemy_droids)
	{
		powerEnemy += Math.max(35, droid.cost);
	}

	// Add enemies until the power exceeds the human players
	while (powerEnemy < powerAllies)
	{
		const template = TEMPLATES[syncRandom(length)];
		if (template)
		{
			const [x, y] = spawn_positions[syncRandom(spawn_positions.length)];
			hackNetOff();
			const droid = addDroid(ENEMY, x, y, template.name, template.body, template.propulsion, "", "", ...template.turrets);
			hackNetOn();

			powerEnemy += Math.max(35, droid.cost);
		}
	}

	queue("spawn_tick", 10 * 1000);
}

const spawn_positions = (() => {
	const continents = [];
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player === ENEMY)
		{
			continue;
		}
		const { x, y } = startPositions[player];
		continents.push(MapTiles[y][x].hoverContinent);
	}

	return spawn_getPositions((x, y) =>
	{
		const continent = MapTiles[y][x].hoverContinent;
		return continents.some(c => c === continent);
	});
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
