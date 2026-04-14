namespace("timer_");

function timer_eventStartLevel()
{
	if (baseType === CAMP_CLEAN)
	{
		setMissionTime(5 * 60);
	}
	else if (baseType === CAMP_BASE)
	{
		setMissionTime(4 * 60);
	}
	else // CAMP_WALLS
	{
		setMissionTime(3 * 60);
	}
}

function timer_eventMissionTimeout()
{
	setMissionTime(-1);
}
