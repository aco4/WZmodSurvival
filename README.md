# SurvivalMod
- How long can you survive?
- Cooperative team game (1-4 players) against endless enemies
- Shared research
- Enemy units get stronger over time
- Enemy research follows vanilla timeline
- BUG FIX: truck long-range repair will cause error
- Experience gain disabled. No ranks

No saveload support yet.

## Maps
- Enemies spawn on the edges of the map
- Enemies cannot spawn on CLIFF or WATER tiles
- The mod does not use scroll limits to manipulate the map size
- The mod does not check if number of structures complies with limits
- Player 0 is the enemy AI

## AI Difficulty
* Insane = 10 enemies per second
* Hard = 5 enemies per second
* Medium = 3.33 enemies per second
* Easy = 2.5 enemies per second

## Configuration
Edit `TEMPLATES.js` to configure:
* Enemy unit designs
* The order of appearance

Edit `spawn.js` to configure:
* The delay between enemy spawns (minimum = 100. only intervals of 100 work)
* Enemy spawn positions

Edit `timer.js` to configure:
* The number of seconds until the attack begins

## Workflow
Each directory in [WZmodSurvival/maps/](/maps/) represents a different map. These directories contain files that override the ones in [WZmodSurvival/mod/SurvivalMod](/mod/SurvivalMod/). The workflow in [WZmodSurvival/.github/workflows/build_mods.yml](/.github/workflows/build_mods.yml) will automatically build the mods for each map by overriding the correct files.

## License
SPDX-License-Identifier: GPL-2.0-or-later

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, see https://www.gnu.org/licenses/.
