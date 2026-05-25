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
		let difference = numObjectsEnemy - numObjectsAllies;
		for (const droid of enumDroid(ENEMY))
		{
			removeObject(droid, true); // remove droid with sfx
			difference -= 1;
			if (difference <= 0)
			{
				return;
			}
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
			count += countDroid(DROID_ANY, player);
			count += enumStruct(player).length;
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
