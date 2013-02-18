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

var ARROW_SPEED = 12;

function Arrow(pos) {
    this.pos = pos;
}

// returns true if firing an arrow
Arrow.prototype.update = function (tocks) {
    this.pos.x += ARROW_SPEED;
};

Arrow.prototype.erase = function (ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, ACTOR_SIZE, ACTOR_SIZE);
};

Arrow.prototype.draw = function (ctx) {
    var frameX = 8;
    var frameY = 13;

    ctx.drawImage(SPRITES_IMG, frameX * (ACTOR_SIZE + 2), frameY * (ACTOR_SIZE + 2), ACTOR_SIZE, ACTOR_SIZE, this.pos.x, this.pos.y, ACTOR_SIZE, ACTOR_SIZE);
};

Arrow.prototype.isHittingRunner = function (runner) {
    if (runner.state != RunnerState.RUNNING)
        return false;

    return this.pos.x - ACTOR_SIZE + ACTOR_SIZE < runner.pos.x
        && this.pos.x - ACTOR_SIZE + ACTOR_SIZE + 32 > runner.pos.x
        && this.pos.y - 18 < runner.pos.y
        && this.pos.y + 18 > runner.pos.y;
};