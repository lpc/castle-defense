/*
# Castle Defense: An action-packed HTML5 math game
# Copyright (C) 2012 Bryant Brownell
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var Maps = [
    {
        name: "Editor Palette",
        chars: "aaabacadaeafagahaiajakalamanaoapaqarasatauavawaxayazbabbbcbdbebfbgbhbibjbkblbmbnbobpbqbrbsbtbubvbwbxbybzcacbcccdcecfcgchcicjckclcmcncocpcqcrcsctcucvcwcxcyczdadbdcdddedfdgdhdidjdkdldmdndodpdqdrdsdtdudvdwdxdydz",
        size: { x: 13, y: 8 }
    },
    {
        name: "Menu",
        chars: "dededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededecbdedededededededededededededededededededededededededededecadedededededededededededededededededededededededededededecndedededededededededededededededededededededededededededecndededededededededededededededededecbdedededededededededecndededededededededededededededededecadedededededededededecndededededededededededededededededecndedededededededededecndededededededededededededededededecndedededededededededecnaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaecndedededededededededecnagarcpararcpararcpararcpararcpararcndedededededededededecndbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbcndededededededededededndedededededededededededededededededndededededededededededededededededededededededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT }
    },
    {
        name: "Basic",
        chars: "dedededededededededededededededededededededededededededededededededededededededecbdedededededededecbdededededededededededededededecbatbtaecaaeaiajaeaeaeaeaecadededededededededededededededecabtcgarcnaravawcparabacarcndededededededededededededededecncgctarcnarbibjararaoaparcndededededededededededededededecnctdgbedabebvbwbebebebebecndededededededededededededededecndgdtalaldfalalalalanalalcndededededededededededededededecndtbabbbcdfdrdrdrdrdralalcndededededededededededededededecnalbnbobpdfararararasbkbkcndededededededededededededededecnakalalaldfbebebebebfbkbkcndededededededededededededededecnalalalaldfakakakdpakakakcndededededededededededededededecnalbabbbcdfalcddrdrdrdrdrcndededededededededededededededecndrbnbobpdscedfdbdbdbdbdbdndedededededededededededededededndbdbdbdbdbdqdsdedededededededededededededededededededededededededededbdbdedededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT },
        routes: [
            {
                start: { x: 13, y: 5 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.RIGHT, len: 5 },
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.LEFT, len: 5 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            }
        ],
        archers: [
            { x: 10, y: 6 },
            { x: 10, y: 10 }
        ],
        goal: { x: 16, y: 14 },
        equation: { x: 10, y: 16 }
    },
    {
        name: "Large Room, Closed",
        chars: "dedededededededededededededededededededededededededededededededededededededecbdedededededededededededededededededededededededecbatbtaecaaecicjaeaeaiajbuaudededededededededededededededecaaecgarcnarcvcwcparavawcubuaudedededededededededededededecnarctarcnardidjararbibjcucubuaudedededecbdedededededededecnardgbedabedvdwbedcbvbwdhcucuaeaeaiajaecadedededededededecnamdtalaldfalalalalalaldudhcuabacavawcpcndedededededededecnazbabbbcdfalaldpalalaldfdudhaoapbibjarcndedededededededecnazbnbobpdfalaldrdrdrdrdsaldubebebvbwbecndedededededededecnazaeafdodfbkblaqaragarararararasbkblaqcndedededededededecnazarasaldfbkblbdbebebeahbebebebfbkblbdcndedededededededecnazamasaldfdoalalalalalakakakalalalalakcndedededededededecnbzazbabbbcdrdrdrcecddrdrdrdrdrdrdrdrdrcndedededededededecndybzbnbobpdbdbdbdddfdbdbdbdbdbdbdbdbdbdndededededededededndbdbdbdbdbdedededqdsdedededededededededededededededededededededededededededbdbdedededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT },
        routes: [
            {
                start: { x: 15, y: 5 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.LEFT, len: 4 },
                    { dir: Direction.DOWN, len: 5 },
                    { dir: Direction.RIGHT, len: 3 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            },
            {
                start: { x: 22, y: 8 },
                paths: [
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.LEFT, len: 8 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            }
        ],
        archers: [
            { x: 8, y: 6 },
            { x: 9, y: 11 }
        ],
        goal: { x: 17, y: 15 },
        equation: { x: 9, y: 17 }
    },
    {
        name: "Impossible",
        chars: "dedededededededededecbdedededededededededecbdededededededededededededededededecaaeaeaeaeaiajaeaeaiajcadededededededededededededededededecnararcparavawarcpavawcndededededededededededededededededecnararararbibjararbibjcndededededededededededededededededecnbebebebebvbwbebebvbwcndededededededededededededededededecndoalaldfalalalalalalcndededededededededededededecbatbtaecnbabbbcdfdrdrdrdralalcndededededededededededededecabtcgarcnbnbobpdfahbebebfbkbkcndededededededededededededecncgctarcnaiajaeafdoakakdfbkbkcndededededededededededededecnctdgbecnavawcpasakakakdfbkbkcndededededededededededededecndgdtalcnbibjarasbabbbcafbkbkcndededededededededededededecndtalaldabvbwbebfbnbobpbfbkbkcndededededededededededededecnalalalalalalakakakakakakakakcndededededededededededededecnbabbbcdrdrdrdrdrdrdrcecddrdrcndededededededededededededecnbnbobpdbdbdbdbdbdbdbdddfdbdbdndedededededededededededededndbdbdbdedededededededqdsdedededededededededededededededededededededededededededbdbdedededededededededededededededededededededededededededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT },
        routes: [
            {
                start: { x: 15, y: 4 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.RIGHT, len: 4 },
                    { dir: Direction.DOWN, len: 7 },
                    { dir: Direction.LEFT, len: 2 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            },
            {
                start: { x: 19, y: 4 },
                paths: [
                    { dir: Direction.DOWN, len: 9 },
                    { dir: Direction.LEFT, len: 2 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            },
            {
                start: { x: 11, y: 11 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.RIGHT, len: 6 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            }
        ],
        archers: [
            { x: 12, y: 5 },
            { x: 16, y: 9 },
            { x: 8, y: 12 }
        ],
        goal: { x: 20, y: 16 },
        equation: { x: 13, y: 17 }
    },
    {
        name: "Walking Up",
        chars: "dedededededededededededededededededededededededededededededededededededededededededecbdededededededededededededededededededededededeatbtaeaeaecadededededededededededededededededededededecbatbtcgcparcpcndededededecbdededededededededededededededecabtcgctarararcnaiajaeaeaecadededededededededededededededecncgctdgbebebecnavawarabaccndededededededededededededededecnctdgdtdfdoalcnbibjaraoapcndededededededededededededededecndgdtaldfalandabvbwbebedccndedecbdedededededededededededecndtalaldfalalddakakakalakcnaiajcadedededededededededededecnalbabbbcakaldqdrdrdrakakcnavawcndedededededededededededecnalbnbobpbkbkaqararasaxaycnbibjcndedededededededededededecnalalaldfbkbkbdbeahbfaxaydabvbwcndedededededededededededecnalalaldfdoaldpakakalakakalakakcndedededededededededededecnbabbbcdfdrdrdrdrdrdrdrdrdrdrdrcndedededededededededededecnbnbobpdsdbdbdbdbdbdbdbdbdbdbdbdndededededededededededededndbdbdbdbdededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT },
        routes: [
            {
                start: { x: 20, y: 11 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.LEFT, len: 9 },
                    { dir: Direction.UP, len: 6 }
                ]
            },
            {
                start: { x: 14, y: 7 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.RIGHT, len: 3 },
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.LEFT, len: 6 },
                    { dir: Direction.UP, len: 6 }
                ]
            }
        ],
        archers: [
            { x: 9, y: 8 },
            { x: 8, y: 12 }
        ],
        goal: { x: 20, y: 16 },
        equation: { x: 10, y: 18 }
    },
    {
        name: "Long Zag, Closed",
        chars: "dededededededededededecbdedededededededecbdedededededededededededededededecbbtaecaaeaiajcccccicjaecadedededededededededededededededecacgarcncpavawararcvcwcpcndedededededededededededededededecnctarcnarbibjarardidjarcndedededededededededededededededecndgbedabebvbwbebedvdwbecndedededededededededededededededecndtalaldfdoalalalalalalcndedededededededededededededededecnbabbbcdfalaldrdrdrdrdrcndedededededededededededededededecnbnbobpdfaxayaqcparararcndedededededededededededededededecnalalaldfaxaybdbebebebecndedededededededededededededededecnalalaldfdoakakalakakakcndedededededededededededededededecnbabbbcdfakakakakakakalcndedededededededededededededededecnbnbobpdfaeaeaeaeafbkblcndedededededededededededededededecnalalaldfbebebebebfbkblcndedededededededededededededededecnalalaldfdoakalakalakalcndedededededededededededededededecnbabbbcdfakcddrdrdrdrdrcndedededededededededededededededecnbnbobpdscedfdbdbdbdbdbdndededededededededededededededededndbdbdbdbdqdsdedededededededededededededededededededededededededededbdbdededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT },
        routes: [
            {
                start: { x: 13, y: 4 },
                paths: [
                    { dir: Direction.DOWN, len: 6 },
                    { dir: Direction.RIGHT, len: 5 },
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.LEFT, len: 5 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            }
        ],
        archers: [
            { x: 10, y: 5 },
            { x: 10, y: 9 },
            { x: 10, y: 13 }
        ],
        goal: { x: 16, y: 17 },
        equation: { x: 5, y: 18 }
    },
    {
        name: "Long Zag, Open",
        chars: "dededededededededededecbdedededededededecbdedededededededededededededededecbbtaecaaeaiajccccaiajajcadedededededededededededededededecacgarcncpavawararavawcpcndedededededededededededededededecnctarcnarbibjararbibjarcndedededededededededededededededecndgbedabebvbwbebebvbwbecndedededededededededededededededecndtalaldfdoalalalalalalcndedededededededededededededededecnbabbbcdfalaldrdrdrdrdrcndedededededededededededededededecnbnbobpdfaxayaqcparararcndedededededededededededededededecnalalaldfaxaybdbebebebecndedededededededededededededededecnalalaldfdoakakalakakakcndedededededededededededededededecnbabbbcdfakakakakakakalcndedededededededededededededededecnbnbobpdfaeaeaeaeafbkblcndedededededededededededededededecnalalaldfbebebebebfbkblcndedededededededededededededededecnalalaldfdoakalakalakalcndedededededededededededededededecnbabbbcdfakcddrdrdrdrdrcndedededededededededededededededecnbnbobpdscedfdbdbdbdbdbdndededededededededededededededededndbdbdbdbdqdsdedededededededededededededededededededededededededededbdbdededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT },
        routes: [
            {
                start: { x: 13, y: 4 },
                paths: [
                    { dir: Direction.DOWN, len: 6 },
                    { dir: Direction.RIGHT, len: 5 },
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.LEFT, len: 5 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            },
            {
                start: { x: 17, y: 4 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.LEFT, len: 4 },
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.RIGHT, len: 5 },
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.LEFT, len: 5 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            }
        ],
        archers: [
            { x: 10, y: 5 },
            { x: 10, y: 9 },
            { x: 10, y: 13 }
        ],
        goal: { x: 16, y: 17 },
        equation: { x: 5, y: 18 }
    },
    {
        name: "Large Room, Open",
        chars: "dedededededededededededededededededededededededededededededededededededededecbdedededededededededededededededededededededededecbatbtaecaaeaiajaeaeaiajbuaudededededededededededededededecaaecgarcnaravawcparavawcubuaudedededededededededededededecnarctarcnarbibjararbibjcucubuaudedededecbdedededededededecnardgbedabebvbwbedcbvbwdhcucuaeaeaiajaecadedededededededecnamdtalaldfalalalalalaldudhcuabacavawcpcndedededededededecnazbabbbcdfalaldpalalaldfdudhaoapbibjarcndedededededededecnazbnbobpdfalaldrdrdrdrdsaldubebebvbwbecndedededededededecnazaeafdodfbkblaqaragarararararasbkblaqcndedededededededecnazarasaldfbkblbdbebebeahbebebebfbkblbdcndedededededededecnazamasaldfdoalalalalalakakakalalalalakcndedededededededecnbzazbabbbcdrdrdrcecddrdrdrdrdrdrdrdrdrcndedededededededecndybzbnbobpdbdbdbdddfdbdbdbdbdbdbdbdbdbdndededededededededndbdbdbdbdbdedededqdsdedededededededededededededededededededededededededededbdbdedededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededededede",
        size: { x: MAP_TILES_WIDTH, y: MAP_TILES_HEIGHT },
        routes: [
            {
                start: { x: 11, y: 5 },
                paths: [
                    { dir: Direction.DOWN, len: 7 },
                    { dir: Direction.RIGHT, len: 3 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            },
            {
                start: { x: 15, y: 5 },
                paths: [
                    { dir: Direction.DOWN, len: 2 },
                    { dir: Direction.LEFT, len: 4 },
                    { dir: Direction.DOWN, len: 5 },
                    { dir: Direction.RIGHT, len: 3 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            },
            {
                start: { x: 22, y: 8 },
                paths: [
                    { dir: Direction.DOWN, len: 4 },
                    { dir: Direction.LEFT, len: 8 },
                    { dir: Direction.DOWN, len: 2 }
                ]
            }
        ],
        archers: [
            { x: 8, y: 6 },
            { x: 9, y: 11 }
        ],
        goal: { x: 17, y: 15 },
        equation: { x: 9, y: 17 }
    }
];