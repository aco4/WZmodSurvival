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
	queue("audio_playNexus");
}

const audio_NEXUS = [
	"col011a.ogg",
	"col012a.ogg",
	"col013a.ogg",
	"col014a.ogg",
	"col015a.ogg",
	"col016a.ogg",
	"col017a.ogg",
	"col018a.ogg",
	"col019a.ogg",
	"col020a.ogg",
];

function audio_playNexus()
{
	const v = audio_NEXUS[syncRandom(audio_NEXUS.length)];
	playSound(v);
	queue("audio_playNexus", syncRandom(2 * 60 * 1000));
}
