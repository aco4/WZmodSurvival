namespace("vtol_");

function vtol_eventStartLevel()
{
	setTimer("vtol_despawn", 3000);
}

function vtol_despawn()
{
	enumArea(1, 1, 2, 2, ENEMY, false).forEach(object =>
	{
		if (object.type === DROID && object.isVTOL)
		{
			removeObject(object);
		}
	});
}
