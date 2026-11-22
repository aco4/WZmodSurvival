namespace("minimap_");

function minimap_eventStartLevel()
{
	if (isSpectator(-1))
	{
		setMiniMap(true);
	}
	else
	{
		minimap_check();
	}
}

function minimap_canSeeMinimap(player)
{
	return enumStruct(player, HQ).some(structure => structure.status === BUILT);
}

function minimap_check()
{
	if (minimap_canSeeMinimap(selectedPlayer))
	{
		setMiniMap(true);
	}
	else
	{
		setMiniMap(false);
	}
}

function minimap_eventStructureBuilt(structure, droid)
{
	if (structure.player === selectedPlayer)
	{
		minimap_check();
	}
}

function minimap_eventDestroyed(object)
{
	if (object.player === selectedPlayer)
	{
		minimap_check();
	}
}

function minimap_eventStructureDemolish(structure, droid)
{
	if (structure.player === selectedPlayer)
	{
		minimap_check();
	}
}

function minimap_eventObjectTransfer(object, from)
{
	if (object.player === selectedPlayer || from === selectedPlayer)
	{
		minimap_check();
	}
}
