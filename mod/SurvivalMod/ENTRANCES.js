const ENTRANCES = (() => {

	// Helper function: iterate over the border tiles [x, y] and return matches
	function getPositions(filter)
	{
		const positions = [];

		for (let x = 1; x < mapWidth - 1; x++)
		{
			// North
			if (filter(x, 1))
			{
				positions.push([x, 1]);
			}
			// South
			if (filter(x, mapHeight - 2))
			{
				positions.push([x, mapHeight - 2]);
			}
		}

		// Don't double-count the corners; start/end at 2
		for (let y = 2; y < mapHeight - 2; y++)
		{
			// West
			if (filter(1, y))
			{
				positions.push([1, y]);
			}
			// East
			if (filter(mapWidth - 2, y))
			{
				positions.push([mapWidth - 2, y]);
			}
		}

		return positions;
	};

	// Ignore tiles that are unreachable from player start position
	// Collect start tiles for continent comparisons
	const startTiles = [];
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player !== ENEMY)
		{
			const { x, y } = startPositions[player];
			startTiles.push(MapTiles[y][x]);
		}
	}

	// Perform continent comparisons
	const limitedPositions = getPositions((x, y) =>
	{
		return startTiles.some(t => t.limitedContinent === MapTiles[y][x].limitedContinent);
	});

	if (limitedPositions.length === 0)
	{
		return getPositions((x, y) =>
		{
			return startTiles.some(t => t.hoverContinent === MapTiles[y][x].hoverContinent);
		});
	}

	return limitedPositions;
})();
