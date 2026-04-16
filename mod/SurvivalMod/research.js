namespace("research_");

const research_minimumResearchTime = includeJSON("minimumResearchTime.json");

const research_offset = (() =>
{
	const multiTechLevel = getMultiTechLevel();

	if (multiTechLevel === 1)
	{
		if (baseType === CAMP_CLEAN)
		{
			return 0; // Construction Unit, Light Body - Viper, and Wheeled Propulsion
		}
		else if (baseType === CAMP_BASE)
		{
			return 3*60; // after Half-tracked Propulsion and Light Cannon
		}
		else // CAMP_WALLS
		{
			return 6.4*60; // after Factory Module and HEAT Cannon Shells Mk2
		}
	}
	else if (multiTechLevel === 2)
	{
		return 17*60;
	}
	else if (multiTechLevel === 3)
	{
		return 26*60; // after Needle Gun and Scourge Missile
	}
	else // multiTechLevel === 4
	{
		return null;
	}
})();

function research_eventStartLevel()
{
	if (research_offset === null)
	{
		return;
	}

	for (let player = 0; player < maxPlayers; player++)
	{
		enableResearch("R-Sys-Sensor-Turret01", player);
		enableResearch("R-Wpn-MG1Mk1", player);
		enableResearch("R-Sys-Engineering01", player);
		research_completeOnTime(research_offset, player);
	}
}

function research_eventMissionTimeout()
{
	setTimer("research_tick", 60*1000); // every 1 minute
}

function research_tick()
{
	research_completeOnTime(research_offset + Math.floor(gameTime/1000), ENEMY);
}

function research_completeOnTime(time, player)
{
	hackNetOff();
	for (const [research, researchTime] of Object.entries(research_minimumResearchTime))
	{
		if (researchTime <= time)
		{
			completeResearch(research, player);
		}
	}
	hackNetOn();
}
