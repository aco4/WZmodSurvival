namespace("base_")

function base_eventGameInit()
{
	for (let player = 0; player < maxPlayers; player++)
	{
		if (baseType === CAMP_CLEAN || baseType === CAMP_BASE)
		{
			for (const structure of enumStruct(player))
			{
				if (base_shouldRemove(structure.stattype, player))
				{
					removeObject(structure);
				}
			}
		}
	}
	enumStruct(ENEMY).forEach(s => removeObject(s));
	enumDroid(ENEMY).forEach(d => removeObject(d));
}

function base_shouldRemove(stattype, player)
{
	if (baseType === CAMP_CLEAN && playerData[player].difficulty !== INSANE)
	{
		return true; // remove everything
	}
	else if (baseType === CAMP_CLEAN && playerData[player].difficulty === INSANE)
	{
		return stattype !== WALL
			&& stattype !== DEFENSE
			&& stattype !== GATE
			&& stattype !== RESOURCE_EXTRACTOR;
	}
	else if (baseType === CAMP_BASE && playerData[player].difficulty !== INSANE)
	{
		return stattype === WALL
			|| stattype === DEFENSE
			|| stattype === GATE
			|| stattype === CYBORG_FACTORY
			|| stattype === COMMAND_CONTROL;
	}
	else if (baseType === CAMP_BASE && playerData[player].difficulty === INSANE)
	{
		return stattype === CYBORG_FACTORY
			|| stattype === COMMAND_CONTROL;
	}
	else // CAMP_WALLS
	{
		return false; // don't remove anything
	}
}
