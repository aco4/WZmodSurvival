namespace("gameOver_");

var gameOver_message = "";

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

		gameOver_message = gameOver_formatTime(gameTime);
		gameOver_sendMessage();
		setTimer("gameOver_sendMessage", 5000);
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

function gameOver_sendMessage()
{
	console(" ");
	console("★ " + _("Well-played") + " ★");
	console(_("You survived") + " " + gameOver_message);
	console(" ");
}

function gameOver_formatTime(time)
{
	const hours = Math.floor(time/1000/60/60);
	const minutes = Math.floor(time/1000/60) % 60;
	const seconds = Math.floor(time/1000) % 60;
	if (hours > 0)
	{
		return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
	}
	else
	{
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	}
}
