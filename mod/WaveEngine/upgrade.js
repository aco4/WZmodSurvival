namespace("upgrade_");

function upgrade_eventMissionTimeout()
{
	setTimer("upgrade_tick", 60 * 1000);
}

function upgrade_tick()
{
	Object.keys(Stats.Body).forEach(componentName =>
	{
		if (Stats.Body[componentName].BodyClass === "Droids")
		{
			Upgrades[ENEMY].Body[componentName].Armour      += 7;
			Upgrades[ENEMY].Body[componentName].HitPointPct += 7;
			Upgrades[ENEMY].Body[componentName].Thermal     += 8;
			Upgrades[ENEMY].Body[componentName].Power       += 1;
		}
		else (Stats.Body[componentName].BodyClass === "Cyborgs")
		{
			Upgrades[ENEMY].Body[componentName].Armour      += 7;
			Upgrades[ENEMY].Body[componentName].HitPointPct += 7;
			Upgrades[ENEMY].Body[componentName].Thermal     += 9;
		}
	});
	Object.keys(Stats.Weapon).forEach(componentName =>
	{
		Upgrades[ENEMY].Weapon[componentName].Damage         += 4;
		Upgrades[ENEMY].Weapon[componentName].RadiusDamage   += 4;
		Upgrades[ENEMY].Weapon[componentName].RepeatDamage   += 4;
		Upgrades[ENEMY].Weapon[componentName].FirePause      = Math.max(1,  Upgrades[ENEMY].Weapon[componentName].FirePause      - 1);
		Upgrades[ENEMY].Weapon[componentName].ReloadTime     = Math.max(1,  Upgrades[ENEMY].Weapon[componentName].ReloadTime     - 1);
		Upgrades[ENEMY].Weapon[componentName].HitChance      = Math.min(99, Upgrades[ENEMY].Weapon[componentName].HitChance      + 1);
		Upgrades[ENEMY].Weapon[componentName].ShortHitChance = Math.min(99, Upgrades[ENEMY].Weapon[componentName].ShortHitChance + 1);
	});
}
