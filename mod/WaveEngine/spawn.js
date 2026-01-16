namespace("spawn_")

const spawn_continents = (() =>
{
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
	return continents;
})();

const spawn_positions = spawn_getPositions((x, y) =>
{
	const continent = MapTiles[y][x].limitedContinent;
	const t = terrainType(x, y);
	return spawn_continents.some(c => c === continent) && t !== TER_CLIFFFACE && t !== TER_WATER;
});

function spawn_eventMissionTimeout()
{
	spawn_tick();
}

function spawn_tick()
{
	if (countDroid(DROID_ANY, ENEMY) < 1500)
	{
		for (let i = 0; i < derrickPositions.length; i++) // scale with number of oils
		{
			const [x, y] = spawn_positions[syncRandom(spawn_positions.length)];
			const template = TEMPLATES[syncRandom(TEMPLATES.length)];
			Template.spawn(Template.fromString(template), ENEMY, x, y);
		}
	}
	const delay = 45000 * Math.E**(-0.000001*gameTime);
	queue("spawn_tick", delay);
}

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
