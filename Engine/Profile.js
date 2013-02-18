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

var STARTING_LIVES = 3;

function Profile() {
    this.lives = STARTING_LIVES;
    this.score = 0;
    this.level = 1;
    this.topScore = 0;
}

Profile.prototype.reset = function () {
    this.lives = STARTING_LIVES;
    this.score = 0;
    this.level = 1;
}