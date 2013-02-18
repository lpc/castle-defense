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

var TILES_ASCII_OFFSET = 97;
var TILES_ASCII_CHARS = 26;
var TILES_IMAGE_WIDTH = 13;

var MAP_TILES_WIDTH = 29;
var MAP_TILES_HEIGHT = 18;

function Map() {
    this.size = { x: 0, y: 0 };
    this.chars = '';
    this.goal = { x: 0, y: 0 };
    this.routes = [];
    this.archers = [];
    this.equation = { x: 0, y: 0 };
    this.runnersRemaining = { x: 0, y: 0, width: 0 };
}

Map.prototype.init = function (map) {
    this.chars = map.chars;
    this.size = map.size;
    this.routes = map.routes;
    this.goal = map.goal;
    this.equation = map.equation;
    this.runnersRemaining = map.runnersRemaining;
}

Map.prototype.isTileOutsideBounds = function (x, y) {
    return (x < 0 || y < 0 || x >= this.size.x || y >= this.size.y);
};

Map.prototype.getLetterIndex = function (x, y) {
    return 2 * ((y * this.size.x) + x);
};

Map.prototype.getSourceCoords = function (letters) {
    var idx = ((letters.charCodeAt(0) - TILES_ASCII_OFFSET) * TILES_ASCII_CHARS) + letters.charCodeAt(1) - TILES_ASCII_OFFSET;

    var x = idx % TILES_IMAGE_WIDTH;
    var y = (idx - x) / TILES_IMAGE_WIDTH;
    return { x: x, y: y };
};

Map.prototype.getTile = function (x, y) {
    if (this.isTileOutsideBounds(x, y))
        throw 'Attempted to get tile out of range: x = ' + x + '; y = ' + y + ';';

    return this.chars.substr(this.getLetterIndex(x, y), 2);
};

Map.prototype.setTile = function (x, y, letters) {
    if (this.isTileOutsideBounds(x, y))
        return;

    var index = this.getLetterIndex(x, y);
    this.chars = [this.chars.slice(0, index), letters, this.chars.slice(index + 2)].join('');
};