namespace("research_");

var research_minimumResearchTime = includeJSON("minimumResearchTime.json");

var research_list = Object.entries(research_minimumResearchTime);

function research_eventStartLevel()
{
	if (TECH_OFFSET === null)
	{
		for (let player = 0; player < maxPlayers; player++)
		{
			completeAllResearch(player);
		}
	}
	else
	{
		for (let player = 0; player < maxPlayers; player++)
		{
			enableResearch("R-Sys-Sensor-Turret01", player);
			enableResearch("R-Wpn-MG1Mk1", player);
			enableResearch("R-Sys-Engineering01", player);
			research_completeOnTime(TECH_OFFSET, player);
		}
	}
}

function research_eventResearched(research, structure, player)
{
	if (player === ENEMY || TECH_OFFSET === null)
	{
		return;
	}

	const time = research_minimumResearchTime[research.id];
	if (time)
	{
		research_completeOnTime(time, ENEMY);
		TECH_TIME = Math.max(TECH_TIME, TECH_OFFSET + time);
	}
}

function research_completeOnTime(time, player)
{
	hackNetOff();
	for (const [research, researchTime] of research_list)
	{
		if (researchTime <= time)
		{
			completeResearch(research, player);
		}
	}
	hackNetOn();
}
