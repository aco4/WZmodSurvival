namespace("power_");

function power_eventStartLevel()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		if (baseType === CAMP_CLEAN)
		{
			setPower(1300, player);
		}
		else if (baseType === CAMP_BASE)
		{
			setPower(2500, player);
		}
		else // CAMP_WALLS
		{
			setPower(2500, player);
		}

		if (powerType === 0)
		{
			setPowerModifier(75, player);
		}
		else if (powerType === 1)
		{
			setPowerModifier(100, player);
		}
		else if (powerType === 2)
		{
			setPowerModifier(125, player);
		}
	}
}
