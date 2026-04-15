# Wave Engine
- Complete rewrite of the Warzone 2100 skirmish/multiplayer scripts
- Overhaul the PvP experience into a PvE defense survival mode
- Enemies spawn on the edges of the map
- Enemies cannot spawn on CLIFF or WATER tiles
- Support only 2 teams: a single AI bot (Wave.js) versus a team of 1-4 humans
- Requires shared research on
- Assumes no custom scroll limits or changes in map size (scroll limits === map limits)
- Unit designs are variable
- Assumes map structures are compliant with limits
- No saveload support yet

## Download
1. Start Warzone 2100. Click **Options**
2. Click "Open Configuration Directory"
3. Download [`📦map.wz`](https://example.com/). Put in `📁maps/`
4. Download [`📦mod.zip`](https://example.com/). Put in `📁mods/4.6.2/autoload/`
5. Restart Warzone 2100

## AI Difficulty
* Insane = 10 enemies per second
* Hard = 5 enemies per second
* Medium = 2.5 enemies per second
* Easy = 1.25 enemies per second

## Configuration
Edit `TEMPLATES.js` to configure:
* Enemy unit designs
* The order of appearance

Edit `spawn.js` to configure:
* The delay between enemy spawns (minimum = 100. only intervals of 100 work)
* Enemy spawn positions

Edit `timer.js` to configure:
* The number of seconds until the attack begins

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
