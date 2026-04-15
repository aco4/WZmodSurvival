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

	if (template) {
		const [x, y] = spawn_positions[syncRandom(spawn_positions.length)];
		addDroid(ENEMY, x, y, template.name, template.body, template.propulsion, "", "", ...template.turrets);
	}

	queue("spawn_tick");
}

const spawn_positions = [
	[5, 1],
	[6, 1],
	[7, 1],
	[8, 1],
	[9, 1],
	[10, 1],
	[11, 1],
	[12, 1],
	[13, 1],
	[62, 8],
];
