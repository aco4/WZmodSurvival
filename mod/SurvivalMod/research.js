namespace("research_");

var research_minimumResearchTime = includeJSON("minimumResearchTime.json");

var research_list = Object.entries(research_minimumResearchTime);

function research_eventStartLevel()
{
	if (STARTING_RESEARCH_OFFSET === null)
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
			research_completeOnTime(STARTING_RESEARCH_OFFSET, player);
		}
	}
}

function research_eventResearched(research, structure, player)
{
	if (player === ENEMY || STARTING_RESEARCH_OFFSET === null)
	{
		return;
	}

	const seconds = research_minimumResearchTime[research.id];
	if (seconds && seconds > LATEST_RESEARCH_SECONDS)
	{
		research_completeOnTime(seconds, ENEMY);
		LATEST_RESEARCH_SECONDS = seconds;
	}
}

function research_completeOnTime(seconds, player)
{
	hackNetOff();
	for (const [research, researchTime] of research_list)
	{
		if (researchTime <= seconds)
		{
			completeResearch(research, player);
		}
	}
	hackNetOn();
}
