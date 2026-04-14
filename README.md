# Wave Engine
- Complete rewrite of the Warzone 2100 skirmish/multiplayer scripts
- Overhaul the PvP experience into a PvE defense survival mode
- Enemies spawn on the edges of the map
- Enemies cannot spawn on CLIFF or WATER tiles
- Support only 2 teams: a single AI bot (Wave.js) versus a team of 1-4 humans
- AI Difficulty has no effect
- Requires shared research on
- Assumes no custom scroll limits or changes in map size (scroll limits === map limits)
- Unit designs are fixed
- Spawn rate is variable
- Component upgrades are variable
- Assumes map structures are compliant with limits
- No saveload support yet

## Download
1. Start Warzone 2100. Click **Options**
2. Click "Open Configuration Directory"
3. Download [`📦map.wz`](https://example.com/). Put in `📁maps/`
4. Download [`📦mod.zip`](https://example.com/). Put in `📁mods/4.6.2/autoload/`
5. Restart Warzone 2100

## Configuration
Interesting files to configure:
- `TEMPLATES.js`
- `upgrade.js`
- `timer.js`
- `spawn.js`

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
