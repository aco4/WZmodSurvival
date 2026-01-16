namespace("enableStructure_");

function enableStructure_eventGameInit() {
	for (let player = 0; player < maxPlayers; player++)
	{
		enableStructure("A0CommandCentre", player);
		enableStructure("A0LightFactory", player);
		enableStructure("A0ResourceExtractor", player);
		enableStructure("A0PowerGenerator", player);
		enableStructure("A0ResearchFacility", player);
	}
}
