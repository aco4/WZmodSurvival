namespace("weather_");

function weather_eventStartLevel()
{
	if (tilesetType === "URBAN" || tilesetType === "ROCKIES")
	{
		setTimer("weather_tick", 45 * 1000);
	}
}

function weather_tick()
{
	if (syncRandom(100) > 33)
	{
		if (tilesetType === "URBAN")
		{
			setWeather(WEATHER_RAIN);
		}
		else if (tilesetType === "ROCKIES")
		{
			setWeather(WEATHER_SNOW);
		}
	}
	else
	{
		setWeather(WEATHER_CLEAR);
	}
}
