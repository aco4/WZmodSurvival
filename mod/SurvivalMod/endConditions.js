namespace("endConditions_");

function endConditions_eventGameInit()
{
	queue("endConditions_tick", 2 * 1000);
}

function endConditions_tick()
{
	if (endConditions_isGameOver())
	{
		for (let player = 0; player < maxPlayers; player++)
		{
			endConditions_finalize(player, false);
		}
		if (isSpectator(-1)) {
			gameOverMessage(false);
		}
	}
	else
	{
		queue("endConditions_tick", 2 * 1000);
	}
}

function endConditions_finalize(player, win)
{
	if (player === selectedPlayer) {
		gameOverMessage(win);
	}
	if (!win && !isSpectator(player) && playerData[player].isHuman) {
		// should come after gameOverMessage() to ensure the proper gameOverMessage is displayed
		transformPlayerToSpectator(player);
	}
}

function endConditions_isGameOver()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player !== ENEMY && endConditions_isAlive(player))
		{
			return false;
		}
	}
	return true;
}

function endConditions_isAlive(player)
{
	return countDroid(DROID_CONSTRUCT, player) > 0
		|| enumStruct(player, FACTORY       ).some(structure => structure.status === BUILT)
		|| enumStruct(player, CYBORG_FACTORY).some(structure => structure.status === BUILT);
}
