namespace("reticule_");


////////////////////////////////////////////////////////////////////////////////


function reticule_canManufacture(player)
{
	return enumStruct(player, FACTORY).some(structure => structure.status === BUILT)
		|| enumStruct(player, CYBORG_FACTORY).some(structure => structure.status === BUILT)
		|| enumStruct(player, VTOL_FACTORY).some(structure => structure.status === BUILT);
}

function reticule_canResearch(player)
{
	return enumStruct(player, RESEARCH_LAB).some(structure => structure.status === BUILT);
}

function reticule_canBuild(player)
{
	return countDroid(DROID_CONSTRUCT, player) > 0;
}

function reticule_canDesign(player)
{
	return enumStruct(player, HQ).some(structure => structure.status === BUILT);
}

function reticule_canCommand(player)
{
	return countDroid(DROID_COMMAND, player) > 0;
}


////////////////////////////////////////////////////////////////////////////////


function reticule_manufactureCheck()
{
	if (reticule_canManufacture(selectedPlayer))
	{
		setReticuleButton(1, _("Manufacture (F1)"), "image_manufacture_up.png", "image_manufacture_down.png");
	}
	else
	{
		setReticuleButton(1, _("Manufacture - build factory first"), "", "");
	}
}

function reticule_researchCheck()
{
	if (reticule_canResearch(selectedPlayer))
	{
		setReticuleButton(2, _("Research (F2)"), "image_research_up.png", "image_research_down.png");
	}
	else
	{
		setReticuleButton(2, _("Research - build research facility first"), "", "");
	}
}

function reticule_buildCheck()
{
	if (reticule_canBuild(selectedPlayer))
	{
		setReticuleButton(3, _("Build (F3)"), "image_build_up.png", "image_build_down.png");
	}
	else
	{
		setReticuleButton(3, _("Build - manufacture constructor droids first"), "", "");
	}
}

function reticule_designCheck()
{
	if (reticule_canDesign(selectedPlayer))
	{
		setReticuleButton(4, _("Design (F4)"), "image_design_up.png", "image_design_down.png");
	}
	else
	{
		setReticuleButton(4, _("Design - construct HQ first"), "", "");
	}
}

function reticule_commandCheck()
{
	if (reticule_canCommand(selectedPlayer))
	{
		setReticuleButton(6, _("Commanders (F6)"), "image_commanddroid_up.png", "image_commanddroid_down.png");
	}
	else
	{
		setReticuleButton(6, _("Commanders - manufacture commanders first"), "", "");
	}
}


////////////////////////////////////////////////////////////////////////////////


function reticule_eventStartLevel()
{
	showInterface();

	setReticuleButton(0, _("Close"), "image_cancel_up.png", "image_cancel_down.png");
	if (isSpectator(-1))
	{
		setReticuleButton(1, _("Manufacture - build factory first"), "", "");
		setReticuleButton(2, _("Research - build research facility first"), "", "");
		setReticuleButton(3, _("Build - manufacture constructor droids first"), "", "");
		setReticuleButton(4, _("Design - construct HQ first"), "", "");
		setReticuleButton(5, _("Intelligence Display (F5)"), "image_intelmap_up.png", "image_intelmap_down.png");
		setReticuleButton(6, _("Commanders - manufacture commanders first"), "", "");
		return;
	}
	reticule_manufactureCheck();
	reticule_researchCheck();
	reticule_buildCheck();
	reticule_designCheck();
	setReticuleButton(5, _("Intelligence Display (F5)"), "image_intelmap_up.png", "image_intelmap_down.png");
	reticule_commandCheck();
}

function reticule_objectCheck(object)
{
	if (object.type === DROID)
	{
		if (object.droidType === DROID_CONSTRUCT)
		{
			queue("reticule_buildCheck"); // Wait 1 tick for the object to be removed
		}
		else if (object.droidType === DROID_COMMAND)
		{
			queue("reticule_commandCheck");
		}
	}
	else if (object.type === STRUCTURE)
	{
		if (object.stattype === HQ)
		{
			queue("reticule_designCheck");
		}
		else if (object.stattype === RESEARCH_LAB)
		{
			queue("reticule_researchCheck");
		}
		else if (object.stattype === FACTORY || object.stattype === CYBORG_FACTORY || object.stattype === VTOL_FACTORY)
		{
			queue("reticule_manufactureCheck");
		}
	}
}


////////////////////////////////////////////////////////////////////////////////


function reticule_eventDroidBuilt(droid, structure)
{
	if (droid.player === selectedPlayer)
	{
		reticule_objectCheck(droid);
	}
}

function reticule_eventStructureBuilt(structure, droid)
{
	if (structure.player === selectedPlayer)
	{
		reticule_objectCheck(structure);
	}
}

function reticule_eventStructureDemolish(structure, droid)
{
	if (structure.player === selectedPlayer)
	{
		reticule_objectCheck(structure);
	}
}

function reticule_eventDestroyed(object)
{
	if (object.player === selectedPlayer)
	{
		reticule_objectCheck(object);
	}
}

function reticule_eventObjectRecycled(object)
{
	if (object.player === selectedPlayer)
	{
		reticule_objectCheck(object);
	}
}

function reticule_eventObjectTransfer(object, from)
{
	if (object.player === selectedPlayer || from === selectedPlayer)
	{
		reticule_objectCheck(object);
	}
}

function reticule_eventTransporterEmbarked(transport)
{
	if (transport.player === selectedPlayer)
	{
		reticule_buildCheck();
		reticule_commandCheck();
	}
}

function reticule_eventTransporterDisembarked(transport)
{
	if (transport.player === selectedPlayer)
	{
		reticule_buildCheck();
		reticule_commandCheck();
	}
}

function reticule_eventTransporterLanded(transport)
{
	if (transport.player === selectedPlayer)
	{
		reticule_buildCheck();
		reticule_commandCheck();
	}
}

function reticule_eventStructureUpgradeStarted(structure)
{
	if (structure.player === selectedPlayer)
	{
		reticule_objectCheck(structure);
	}
}
