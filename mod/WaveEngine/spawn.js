namespace("spawn_")

function spawn_eventMissionTimeout()
{
	queue("spawn_tick");
}

function spawn_tick()
{
	const minute = Math.ceil(gameTime / 1000 / 60);
	const length = Math.min(TEMPLATES.length, minute);
	const template = TEMPLATES[syncRandom(length)];

	if (template) {
		const [x, y] = spawn_positions[syncRandom(spawn_positions.length)];
		addDroid(ENEMY, x, y, template.name, template.body, template.propulsion, "", "", ...template.turrets);
	}

	queue("spawn_tick");
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
