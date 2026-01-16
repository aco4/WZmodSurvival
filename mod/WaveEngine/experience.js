namespace("experience_");

function experience_eventStartLevel()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		setExperienceModifier(player, 0);
	}
}
