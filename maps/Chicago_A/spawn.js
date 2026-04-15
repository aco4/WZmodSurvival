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
	[22, 1],
	[23, 1],
	[24, 1],
	[25, 1],
	[26, 1],
	[27, 1],
	[28, 1],
	[29, 1],
	[30, 1],
	[31, 1],
	[32, 1],
	[33, 1],
	[34, 1],
	[35, 1],
	[36, 1],
	[37, 1],
	[38, 1],
	[39, 1],
	[62, 126]
];
