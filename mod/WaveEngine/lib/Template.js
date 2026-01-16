class Template
{
	/**
	 * @param {string} body - component name
	 * @param {string} propulsion - component name
	 * @param {string[]} turrets - array of component names
	 * @returns {object}
	 */
	static from(body, propulsion, turrets)
	{
		return { body, propulsion, turrets };
	}

	static spawn(template, player, x, y)
	{
		hackNetOff();
		const droid = addDroid(
			player, x, y,
			Template.toString(template),
			Stats.Body[template.body].Id,
			Stats.Propulsion[template.propulsion].Id,
			"", "",
			...template.turrets.map(turret => Template.getTurret(turret)?.Id)
		);
		hackNetOn();
		return droid;
	}

	static toString(template)
	{
		return template.turrets.join(" ") + " " + template.body + " " + template.propulsion;
	}

	static getTurret(name)
	{
		return Stats.Weapon[name]
			|| Stats.Construct[name]
			|| Stats.Repair[name]
			|| Stats.Sensor[name]
			|| Stats.ECM[name]
			|| null;
	}

	/**
	 * @param {string} str - space-separated string in order: turrets, body, propulsion
	 * @returns {object|null} template or null if invalid
	 */
	static fromString(str)
	{
		const words = str.split(" ");

		// Try all ways to partition the end into body + propulsion
		for (let bodyStart = 1; bodyStart < words.length; bodyStart++) {
			for (let propStart = bodyStart + 1; propStart <= words.length; propStart++) {
				const body = words.slice(bodyStart, propStart).join(" ");
				const propulsion = words.slice(propStart).join(" ");

				if (Stats.Body.hasOwnProperty(body) &&
					Stats.Propulsion.hasOwnProperty(propulsion))
				{
					const weaponSlots = Stats.Body[body].WeaponSlots;
					const turretWords = words.slice(0, bodyStart);

					const turrets = partitionIntoTurrets(turretWords, weaponSlots);

					if (turrets !== null) {
						return Template.from(body, propulsion, turrets);
					}
				}
			}
		}

		return null;

		function partitionIntoTurrets(words, maxTurrets)
		{
			if (words.length === 0)
			{
				return [];
			}
			if (maxTurrets === 0)
			{
				return null; // Still have words but no slots left
			}
			// Try using all remaining words as a single turret
			const turret = words.join(" ");
			if (Template.getTurret(turret))
			{
				return [turret];
			}
			// Try each possible length for the first turret
			for (let i = 1; i < words.length; i++)
			{
				const firstTurret = words.slice(0, i).join(" ");
				if (Template.getTurret(turret))
				{
					const rest = partitionIntoTurrets(words.slice(i), maxTurrets - 1);
					if (rest !== null)
					{
						return [firstTurret, ...rest];
					}
				}
			}
			return null;
		}
	}
}
