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

var ArcherState = {
    READY: 0,
    FIRING: 1
};

var ARCHER_POS_OFFSET = { x: 16, y: -12 };

var ARCHER_FIRING_FRAME = 5;

function Archer(pos) {
    this.frame = 0;
    this.pos = { x: pos.x * TILE_SIZE + ARCHER_POS_OFFSET.x, y: pos.y * TILE_SIZE + ARCHER_POS_OFFSET.y };
    this.state = ArcherState.READY;

    this.number = 0;
    this.numberRangeBegin = 5;
    this.numberRange = 10;
}

// returns true if firing an arrow
Archer.prototype.update = function (tocks) {
    if (this.state == ArcherState.FIRING) {
        this.frame += 1;

        if (this.frame > 6) {
            this.frame = 0;
            this.state = ArcherState.READY;
        }

        if (this.frame == ARCHER_FIRING_FRAME)
            return true;
    }

    return false;
}

Archer.prototype.draw = function (ctx) {
    var frameX = this.frame;
    var frameY = 13; // archer shooting right

    ctx.clearRect(this.pos.x, this.pos.y, ACTOR_SIZE, ACTOR_SIZE);
    ctx.drawImage(SPRITES_IMG, frameX * (ACTOR_SIZE + 2), frameY * (ACTOR_SIZE + 2), ACTOR_SIZE, ACTOR_SIZE, this.pos.x, this.pos.y, ACTOR_SIZE, ACTOR_SIZE);

    var numberOffset = { x: 48, y: 88 }

    drawText(ctx, this.number, this.pos.x + numberOffset.x, this.pos.y + numberOffset.y, "#CCC", 28, 'right');
    drawText(ctx, world.operator + ' '+ world.operand, this.pos.x + numberOffset.x, this.pos.y + numberOffset.y + 26, "#EEC06A", 28, 'right');
}