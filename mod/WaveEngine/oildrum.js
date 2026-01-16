namespace("oilDrum_");

function oilDrum_eventStartLevel()
{
	oilDrum_tick();
}

function oilDrum_tick()
{
	// Try to place an oil drum
	for (let attempt = 0; attempt < 5; attempt++)
	{
		const x = 3 + syncRandom(mapWidth - 6);
		const y = 3 + syncRandom(mapHeight - 6);
		const oilDrum = oilDrum_spawn(x, y);
		if (oilDrum)
		{
			break;
		}
	}

	// Calculate the time until the next oil drum spawn attempt
	const C = 300000000;
	const mapArea = mapWidth * mapHeight;
	const delay = Math.round(C / mapArea);

	// Queue the next spawn attempt
	queue("oilDrum_tick", delay);
}

function oilDrum_spawn(x, y)
{
	const terrain = terrainType(x, y);
	if (terrain === TER_WATER || terrain === TER_CLIFFFACE || getObject(x, y))
	{
		return null;
	}

	return addFeature("OilDrum", x, y);
}
