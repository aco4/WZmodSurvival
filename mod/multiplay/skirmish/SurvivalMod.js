function eventStartLevel()
{
	setTimer("tick", 3000);
}

function tick()
{
	const targets = enumArea(0, 0, mapWidth, mapHeight, ENEMIES, false);
	if (targets.length === 0)
	{
		return;
	}

	enumDroid().forEach(droid =>
	{
		if (isIdle(droid.order))
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
			else if (Stats.Weapon[droid.weapons[0].fullname].FireOnMove)
			{
				const target = targets[Math.floor(Math.random() * targets.length)];
				orderDroidObj(droid, DORDER_ATTACK, target);
			}
			else
			{
				const target = targets[Math.floor(Math.random() * targets.length)];
				orderDroidLoc(droid, DORDER_SCOUT, target.x, target.y);
			}
		}
	});
}

function isIdle(order)
{
	return order !== DORDER_ATTACK
		&& order !== DORDER_MOVE
		&& order !== DORDER_OBSERVE
		&& order !== DORDER_SCOUT;
}
