namespace("gameTimeLimit_")

function gameTimeLimit_eventStartLevel()
{
	if (gameTimeLimit >= 10 * 60 * 1000)
	{
		queue("gameTimeLimit_warning10", gameTimeLimit - 10 * 60 * 1000);
	}

	if (gameTimeLimit >= 5 * 60 * 1000)
	{
		queue("gameTimeLimit_warning5", gameTimeLimit - 5 * 60 * 1000);
	}

	if (gameTimeLimit >= 3 * 60 * 1000)
	{
		queue("gameTimeLimit_warning3", gameTimeLimit - 3 * 60 * 1000);
	}

	if (gameTimeLimit >= 2 * 60 * 1000)
	{
		queue("gameTimeLimit_warning2", gameTimeLimit - 2 * 60 * 1000);
	}

	if (gameTimeLimit >= 1 * 60 * 1000)
	{
		queue("gameTimeLimit_warning1", gameTimeLimit - 1 * 60 * 1000);
	}
}

function gameTimeLimit_warning10()
{
	console(" ");
	console(_("GAME TIME LIMIT"));
	console(_("10 minutes remaining"));
	console(" ");
	playSound("pcv463.ogg"); // "10 minutes remaining"
}

function gameTimeLimit_warning5()
{
	console(" ");
	console(_("GAME TIME LIMIT"));
	console(_("5 minutes remaining"));
	console(" ");
	playSound("pcv464.ogg"); // "5 minutes remaining"
}

function gameTimeLimit_warning3()
{
	console(" ");
	console(_("GAME TIME LIMIT"));
	console(_("3 minutes remaining"));
	console(" ");
	playSound("pcv465.ogg"); // "3 minutes remaining"
}

function gameTimeLimit_warning2()
{
	console(" ");
	console(_("GAME TIME LIMIT"));
	console(_("2 minutes remaining"));
	console(" ");
	playSound("pcv466.ogg"); // "2 minutes remaining"
}

function gameTimeLimit_warning1()
{
	console(" ");
	console(_("GAME TIME LIMIT"));
	console(_("1 minute remaining"));
	console(" ");
	playSound("pcv467.ogg"); // "1 minute remaining"
}
