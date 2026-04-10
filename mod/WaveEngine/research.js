namespace("research_");

const research_minimumResearchTime = includeJSON("minimumResearchTime.json");

function research_eventStartLevel()
{
	const multiTechLevel = getMultiTechLevel();

	for (let player = 0; player < maxPlayers; player++)
	{
		if (player === ENEMY)
		{
			continue;
		}

		if (multiTechLevel === 1)
		{
			if (baseType === CAMP_CLEAN)
			{
				enableResearch("R-Sys-Sensor-Turret01", player);
				enableResearch("R-Wpn-MG1Mk1", player);
				enableResearch("R-Sys-Engineering01", player);
				research_completeOnTime(0, player); // Construction Unit, Light Body - Viper, and Wheeled Propulsion
			}
			else if (baseType === CAMP_BASE)
			{
				research_completeOnTime(3*60, player); // after Half-tracked Propulsion and Light Cannon
			}
			else // CAMP_WALLS
			{
				research_completeOnTime(6.4*60, player); // after Factory Module and HEAT Cannon Shells Mk2
			}
		}
		else if (multiTechLevel === 2)
		{
			research_completeOnTime(17*60, player);
		}
		else if (multiTechLevel === 3)
		{
			research_completeOnTime(26*60, player); // after Needle Gun and Scourge Missile
		}
		else // multiTechLevel === 4
		{
			completeAllResearch(player);
		}
	}
}

function research_completeOnTime(time, player)
{
	for (const [research, researchTime] of Object.entries(research_minimumResearchTime))
	{
		if (researchTime <= time)
		{
			completeResearch(research, player);
		}
	}
}
