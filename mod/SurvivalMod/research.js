namespace("research_");

const research_MIN_RES_TIME = includeJSON("minimumResearchTime.json");

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

	const seconds = research_MIN_RES_TIME[research.id];
	if (seconds && seconds > LATEST_RESEARCH_SECONDS)
	{
		research_completeOnTime(seconds, ENEMY);
		LATEST_RESEARCH_SECONDS = seconds;
	}
}

function research_completeOnTime(seconds, player)
{
	hackNetOff();
	for (const research in research_MIN_RES_TIME)
	{
		if (Object.hasOwn(research_MIN_RES_TIME, research) && research_MIN_RES_TIME[research] <= seconds)
		{
			completeResearch(research, player);
		}
	}
	hackNetOn();
}
