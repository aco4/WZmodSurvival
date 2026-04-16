namespace("bugFix_");

function bugFix_eventStartLevel()
{
	setTimer("bugFix_longRangeTrucks", 100);
}

// FIX: Truck repair from a long distance (hold position + patrol)
function bugFix_longRangeTrucks()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		if (playerData[player].isHuman)
		{
			enumDroid(player, DROID_CONSTRUCT).forEach(d =>
			{
				if ((d.order === DORDER_PATROL || d.order === DORDER_SCOUT) && d.action === 5) // DACTION_REPAIR
				{
					orderDroid(d, DORDER_STOP);
					if (player === selectedPlayer)
					{
						console("ERROR:", JSON.stringify(d).slice(0,150));
						playSound("beep8.ogg");
						centreView(mapWidth*Math.round(Math.random()), mapHeight*Math.round(Math.random()));
						cameraZoom(0, 9999999);
					}
				}
			});
		}
	}
}
