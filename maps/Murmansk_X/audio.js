namespace("audio_");

var audio_lastHitTime = 0;

function audio_eventAttacked(victimObj, attackerObj)
{
	if ((victimObj.player === selectedPlayer) && (attackerObj.player !== selectedPlayer) && (gameTime > (audio_lastHitTime + 5000)))
	{
		audio_lastHitTime = gameTime;
		if (victimObj.type === STRUCTURE)
		{
			playSound("pcv337.ogg", victimObj.x, victimObj.y, victimObj.z);	// show position if still alive
		}
		else
		{
			playSound("pcv399.ogg", victimObj.x, victimObj.y, victimObj.z);
		}
	}
}

function audio_eventMissionTimeout()
{
	playSound("beacon.ogg");
	playSound("nmedeted.ogg"); // "Enemy detected"
	queue("audio_playNex");
}

const audio_NEX = [
	"laugh1.ogg",
	"laugh2.ogg",
	"laugh3.ogg",
];

function audio_playNex()
{
	const v = audio_NEX[syncRandom(audio_NEX.length)];
	playSound(v);
	queue("audio_playNex", syncRandom(2 * 60 * 1000));
}
