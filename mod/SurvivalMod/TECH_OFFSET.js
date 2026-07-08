const TECH_OFFSET = (() =>
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
