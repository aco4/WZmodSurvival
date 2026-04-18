namespace("gameOver_");

var gameOver_duration = "";

function gameOver_eventGameInit()
{
	queue("gameOver_tick", 2 * 1000);
}

function gameOver_tick()
{
	if (gameOver_isGameOver())
	{
		for (let player = 0; player < maxPlayers; player++)
		{
			gameOver_finalize(player, false);
		}
		if (isSpectator(-1)) {
			gameOverMessage(false);
		}

		const mm = Math.floor(gameTime/1000/60);
		const ss = (Math.floor(gameTime/1000) - 60*mm).toString().padStart(2, "0"); ;
		gameOver_duration = mm + ":" + ss;
		gameOver_message();
		setTimer("gameOver_message", 5000);
	}
	else
	{
		queue("gameOver_tick", 2 * 1000);
	}
}

function gameOver_finalize(player, win)
{
	if (player === selectedPlayer) {
		gameOverMessage(win);
	}
	if (!win && !isSpectator(player) && playerData[player].isHuman) {
		// should come after gameOverMessage() to ensure the proper gameOverMessage is displayed
		transformPlayerToSpectator(player);
	}
}

function gameOver_isGameOver()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player !== ENEMY && gameOver_isAlive(player))
		{
			return false;
		}
	}
	return true;
}

function gameOver_isAlive(player)
{
	return countDroid(DROID_CONSTRUCT, player) > 0
		|| enumStruct(player, FACTORY       ).some(structure => structure.status === BUILT)
		|| enumStruct(player, CYBORG_FACTORY).some(structure => structure.status === BUILT);
}

function gameOver_message()
{
	console(" ");
	console("★ " + _("Well-played") + " ★");
	console(_("You survived") + " " + gameOver_duration);
	console(" ");
}
