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

	// Always match the number of enemies with the number of player objects
	const numObjectsAllies = spawn_count_allies();
	const numObjectsEnemy = countDroid(DROID_ANY, ENEMY);
	if (numObjectsEnemy < numObjectsAllies)
	{
		const difference = numObjectsAllies - numObjectsEnemy;
		for (let i = 0; i < difference; i++)
		{
			const template = TEMPLATES[syncRandom(length)];
			if (template)
			{
				const [x, y] = spawn_positions[syncRandom(spawn_positions.length)];
				hackNetOff();
				addDroid(ENEMY, x, y, template.name, template.body, template.propulsion, "", "", ...template.turrets);
				hackNetOn();
			}
		}
	} else if (numObjectsEnemy > numObjectsAllies) {
		const difference = numObjectsEnemy - numObjectsAllies;
		const droids = enumDroid(ENEMY);

		// Iterate in reverse to remove the oldest droids first
		for (let i = droids.length - 1; i >= droids.length - difference; i--) {
			removeObject(droids[i], true);
		}
	}

	queue("spawn_tick", 3 * 1000);
}

function spawn_count_allies()
{
	let count = 0;
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player !== ENEMY)
		{
			count += countDroid(DROID_ANY, player) - countDroid(DROID_CONSTRUCT, player);
			count += enumStruct(player).length - countStruct("A0ResourceExtractor", player) - countStruct("A0ResearchFacility", player) - countStruct("A0PowerGenerator", player);
		}
	}
	return count;
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
		continents.push(MapTiles[y][x].limitedContinent);
	}

	return spawn_getPositions((x, y) =>
	{
		const continent = MapTiles[y][x].limitedContinent;
		const t = terrainType(x, y);
		return continents.some(c => c === continent) && t !== TER_CLIFFFACE && t !== TER_WATER;
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
