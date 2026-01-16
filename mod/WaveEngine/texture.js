namespace("texture_");

function texture_eventGameInit()
{
	if (tilesetType === "ARIZONA")
	{
		setCampaignNumber(1); // Seems to control radar trapezoid color. See #891
	}
	else if (tilesetType === "URBAN")
	{
		setCampaignNumber(2); // Seems to control radar trapezoid color. See #891
		replaceTexture("page-7-barbarians-arizona.png", "page-7-barbarians-urban.png");
		setSky("texpages/page-25-sky-urban.png", 0.5, 10000.0);
	}
	else if (tilesetType === "ROCKIES")
	{
		setCampaignNumber(3); // Seems to control radar trapezoid color. See #891
		replaceTexture("page-7-barbarians-arizona.png", "page-7-barbarians-kevlar.png");
		setSky("texpages/page-25-sky-urban.png", 0.5, 10000.0);
		// for some reason rockies will use arizona babas
	}
}
