namespace("limits_")

function limits_eventStartLevel()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player === ENEMY)
		{
			continue;
		}

		for (const [name, limit] of Object.entries(limits_structure))
		{
			setStructureLimits(name, limit, player);
		}
		for (const [type, limit] of Object.entries(limits_droid))
		{
			setDroidLimit(player, limit, type);
		}
	}
}

const limits_research = (() =>
{
	switch (maxPlayers - 1) // -1 for ENEMY
	{
		case 1: return 5; // 5 total
		case 2: return 5; // 10 total
		case 3: return 4; // 12 total
		case 4: return 3; // 12 total
		case 5: return 3; // 15 total
		case 6: return 3; // 18 total
		case 7: return 3; // 21 total
		case 8: return 3; // 24 total
		case 9: return 3; // 27 total
		default: return 5;
	}
})();

const limits_structure = {
	"A0CommandCentre": 1,
	"A0ComDroidControl": 1,
	"A0Sat-linkCentre": 1,
	"A0LasSatCommand": 1,

	"A0LightFactory": 5,
	"A0CyborgFactory": 5,
	"A0VTolFactory1": 5,
	"A0ResearchFacility": alliancesType === ALLIANCES_TEAMS ? limits_research : 5,
	"A0RepairCentre3": 5,

	"A0PowerGenerator": 10,

	"A0VtolPad": 50,
};

const limits_droid = {
	[DROID_ANY]: 150,
	[DROID_COMMAND]: 10,
	[DROID_CONSTRUCT]: 15,
};
