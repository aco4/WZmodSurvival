namespace("limits_")

var M = maxPlayers - 1;
var N = M;

function limits_eventPlayerLeft(player)
{
	N -= 1;
	limits_update();
}

function limits_eventStartLevel()
{
	limits_update();
}

function limits_update()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		for (const [name, limit] of Object.entries(limits_structure()))
		{
			setStructureLimits(name, limit, player);
		}
		for (const [type, limit] of Object.entries(limits_droid()))
		{
			setDroidLimit(player, limit, type);
		}
	}
}

function limits_structure()
{
	if (M === 1)
	{
		return {
			"A0CommandCentre":    1, // always 1
			"A0ComDroidControl":  1, // always 1
			"A0Sat-linkCentre":   1, // always 1
			"A0LasSatCommand":    1,

			"A0LightFactory":     5,
			"A0CyborgFactory":    5,
			"A0VTolFactory1":     5,
			"A0ResearchFacility": 5,
			"A0RepairCentre3":    5,

			"A0PowerGenerator":   10,

			"A0VtolPad":          50,
		};
	}
	else if (M === 2)
	{
		if (N === 1)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    2,

				"A0LightFactory":     10,
				"A0CyborgFactory":    10,
				"A0VTolFactory1":     10,
				"A0ResearchFacility": 10,
				"A0RepairCentre3":    10,

				"A0PowerGenerator":   20,

				"A0VtolPad":          100,
			};
		}
		else if (N === 2)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    1,

				"A0LightFactory":     5,
				"A0CyborgFactory":    5,
				"A0VTolFactory1":     5,
				"A0ResearchFacility": 5,
				"A0RepairCentre3":    5,

				"A0PowerGenerator":   10,

				"A0VtolPad":          50,
			};
		}
	}
	else if (M === 3)
	{
		if (N === 1)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    6,

				"A0LightFactory":     12,
				"A0CyborgFactory":    12,
				"A0VTolFactory1":     12,
				"A0ResearchFacility": 12,
				"A0RepairCentre3":    12,

				"A0PowerGenerator":   30,

				"A0VtolPad":          150,
			};
		}
		else if (N === 2)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    3,

				"A0LightFactory":     6,
				"A0CyborgFactory":    6,
				"A0VTolFactory1":     6,
				"A0ResearchFacility": 6,
				"A0RepairCentre3":    6,

				"A0PowerGenerator":   15,

				"A0VtolPad":          75,
			};
		}
		else if (N === 3)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    2,

				"A0LightFactory":     4,
				"A0CyborgFactory":    4,
				"A0VTolFactory1":     4,
				"A0ResearchFacility": 4,
				"A0RepairCentre3":    4,

				"A0PowerGenerator":   10,

				"A0VtolPad":          50,
			};
		}
	}
	else if (M === 4)
	{
		if (N === 1)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    12,

				"A0LightFactory":     12,
				"A0CyborgFactory":    12,
				"A0VTolFactory1":     12,
				"A0ResearchFacility": 12,
				"A0RepairCentre3":    12,

				"A0PowerGenerator":   36,

				"A0VtolPad":          192,
			};
		}
		else if (N === 2)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    6,

				"A0LightFactory":     6,
				"A0CyborgFactory":    6,
				"A0VTolFactory1":     6,
				"A0ResearchFacility": 6,
				"A0RepairCentre3":    6,

				"A0PowerGenerator":   18,

				"A0VtolPad":          96,
			};
		}
		else if (N === 3)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    4,

				"A0LightFactory":     4,
				"A0CyborgFactory":    4,
				"A0VTolFactory1":     4,
				"A0ResearchFacility": 4,
				"A0RepairCentre3":    4,

				"A0PowerGenerator":   12,

				"A0VtolPad":          64,
			};
		}
		else if (N === 4)
		{
			return {
				"A0CommandCentre":    1, // always 1
				"A0ComDroidControl":  1, // always 1
				"A0Sat-linkCentre":   1, // always 1
				"A0LasSatCommand":    3,

				"A0LightFactory":     3,
				"A0CyborgFactory":    3,
				"A0VTolFactory1":     3,
				"A0ResearchFacility": 3,
				"A0RepairCentre3":    3,

				"A0PowerGenerator":   9,

				"A0VtolPad":          48,
			};
		}
	}
	else // M > 4
	{
		// an advantage is gained by having more players
		return {
			"A0CommandCentre":    1, // always 1
			"A0ComDroidControl":  1, // always 1
			"A0Sat-linkCentre":   1, // always 1
			"A0LasSatCommand":    3,

			"A0LightFactory":     3,
			"A0CyborgFactory":    3,
			"A0VTolFactory1":     3,
			"A0ResearchFacility": 3,
			"A0RepairCentre3":    3,

			"A0PowerGenerator":   9,

			"A0VtolPad":          48,
		};
	}
}

function limits_droid()
{
	if (M === 1)
	{
		return {
			[DROID_ANY]: 150,
			[DROID_COMMAND]: 10,
			[DROID_CONSTRUCT]: 15,
		};
	}
	else if (M === 2)
	{
		if (N === 1)
		{
			return {
				[DROID_ANY]: 300,
				[DROID_COMMAND]: 20,
				[DROID_CONSTRUCT]: 30,
			};
		}
		else if (N === 2)
		{
			return {
				[DROID_ANY]: 150,
				[DROID_COMMAND]: 10,
				[DROID_CONSTRUCT]: 15,
			};
		}
	}
	else if (M === 3)
	{
		if (N === 1)
		{
			return {
				[DROID_ANY]: 450,
				[DROID_COMMAND]: 30,
				[DROID_CONSTRUCT]: 42,
			};
		}
		else if (N === 2)
		{
			return {
				[DROID_ANY]: 225,
				[DROID_COMMAND]: 15,
				[DROID_CONSTRUCT]: 21,
			};
		}
		else if (N === 3)
		{
			return {
				[DROID_ANY]: 150,
				[DROID_COMMAND]: 10,
				[DROID_CONSTRUCT]: 14,
			};
		}
	}
	else if (M === 4)
	{
		if (N === 1)
		{
			return {
				[DROID_ANY]: 480,
				[DROID_COMMAND]: 24,
				[DROID_CONSTRUCT]: 48,
			};
		}
		else if (N === 2)
		{
			return {
				[DROID_ANY]: 240,
				[DROID_COMMAND]: 12,
				[DROID_CONSTRUCT]: 24,
			};
		}
		else if (N === 3)
		{
			return {
				[DROID_ANY]: 160,
				[DROID_COMMAND]: 8,
				[DROID_CONSTRUCT]: 16,
			};
		}
		else if (N === 4)
		{
			return {
				[DROID_ANY]: 120,
				[DROID_COMMAND]: 6,
				[DROID_CONSTRUCT]: 12,
			};
		}
	}
	else // M > 4
	{
		// an advantage is gained by having more players
		return {
			[DROID_ANY]: 120,
			[DROID_COMMAND]: 6,
			[DROID_CONSTRUCT]: 12,
		};
	}
}
