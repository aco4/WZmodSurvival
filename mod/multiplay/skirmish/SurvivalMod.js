function eventStartLevel()
{
	setTimer("tick", 3000);
}

function tick()
{
	const targets = [];
	for (let player = 0; player < maxPlayers; player++)
	{
		if (player !== me)
		{
			for (const structure of enumStruct(player))
			{
				if (structure.stattype === RESOURCE_EXTRACTOR || structure.stattype === WALL || structure.stattype === GATE || structure.stattype === REARM_PAD)
				{
					continue;
				}
				targets.push(structure);
			}
		}
	}
	if (targets.length === 0)
	{
		for (let player = 0; player < maxPlayers; player++)
		{
			if (player !== me)
			{
				enumDroid(player, DROID_CONSTRUCT).forEach(s => targets.push(s));
			}
		}
		if (targets.length === 0)
		{
			return;
		}
	}

	enumDroid().forEach(droid =>
	{
		if (isIdle(droid))
		{
			if (droid.isVTOL && droid.weapons[0].armed === 0)
			{
				orderDroidLoc(droid, DORDER_MOVE, 1, 1);
			}
			else if (droid.droidType === DROID_SENSOR)
			{
				const target = targets[Math.floor(Math.random() * targets.length)];
				orderDroidObj(droid, DORDER_OBSERVE, target);
			}
			else
			{
				const target = targets[Math.floor(Math.random() * targets.length)];
				if (droid.propulsion === "hover01")
				{
					orderDroidLoc(droid, DORDER_MOVE, target.x, target.y);
				}
				else
				{
					orderDroidLoc(droid, DORDER_SCOUT, target.x, target.y);
				}
			}
		}
	});
}

function isIdle(droid)
{
	return droid.action === 38 // DACTION_RETURNTOPOS
		|| droid.order !== DORDER_ATTACK
		&& droid.order !== DORDER_MOVE
		&& droid.order !== DORDER_OBSERVE
		&& droid.order !== DORDER_SCOUT;
}
