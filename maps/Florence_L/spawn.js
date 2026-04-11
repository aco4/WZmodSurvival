namespace("spawn_")

function spawn_eventMissionTimeout()
{
	spawn_tick();
}

function spawn_tick()
{
	if (countDroid(DROID_ANY, ENEMY) < 1500)
	{
		for (let i = 0; i < derrickPositions.length; i++) // scale with number of oils
		{
			const [x, y] = SPAWN_POINTS[syncRandom(SPAWN_POINTS.length)];
			const template = TEMPLATES[syncRandom(TEMPLATES.length)];
			Template.spawn(Template.fromString(template), ENEMY, x, y);
		}
	}
	const delay = 42500 * Math.E**(-0.000001*gameTime);
	queue("spawn_tick", delay);
}
