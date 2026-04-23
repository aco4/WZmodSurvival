namespace("spawn_")

function spawn_eventMissionTimeout()
{
	queue("spawn_tick");
}

function spawn_tick()
{
	const minute = Math.ceil(gameTime / 1000 / 60);
	const length = Math.min(TEMPLATES.length, minute);
	const template = TEMPLATES[syncRandom(length)];
	if (template)
	{
		hackNetOff();
		addDroid(ENEMY, 16, 33, template.name, template.body, template.propulsion, "", "", ...template.turrets);
		hackNetOn();
	}
	queue("spawn_tick", 3000);
}
