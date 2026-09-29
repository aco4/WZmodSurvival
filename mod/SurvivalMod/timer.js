namespace("timer_");

function timer_eventStartLevel()
{
	setMissionTime(5 * 60);
}

function spawn_eventMissionTimeout()
{
	setMissionTime(-1);
}
