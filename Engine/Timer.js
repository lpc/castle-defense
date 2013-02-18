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

// all unit in ms
function Timer() {
    this.gameTime = 0;
    this.maxStep = 1000 / 15;
    this.wallLastTimestamp = new Date().getTime();
}

// returns the number of ms since last called
Timer.prototype.tick = function () {
    var wallCurrent = new Date().getTime();
    var wallDelta = (wallCurrent - this.wallLastTimestamp);
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = wallDelta;// Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}