const ENEMY = (() =>
{
	for (let player = 0; player < maxPlayers; player++)
	{
		if (playerData[player].isAI)
		{
			return player;
		}
	}
	return null;
})();
