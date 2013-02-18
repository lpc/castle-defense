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

var RunnerState = {
    RUNNING: 0,
    FINISHING: 1,
    DYING: 2
};

var NUM_FRAMES = [8, 8, 8];

function Runner(start, routes) {
    this.frame = 1;
    this.routes = routes;
    this.routeIndex = 0;
    this.routeProgress = 0;
    this.pos = { x: start.x * TILE_SIZE + 16, y: start.y * TILE_SIZE - 36 };
    this.state = RunnerState.RUNNING;
}

// returns true if runner survived this tock; false otherwise
Runner.prototype.update = function (tocks) {
    this.frame += 1;

    // loop running frames
    if (this.frame > NUM_FRAMES[this.state])
        this.frame = 1;

    if (this.state == RunnerState.RUNNING) {
        var step = this.routes[this.routeIndex].dir.x != 0 ? 4 : 2;
        this.pos.x += this.routes[this.routeIndex].dir.x * step;
        this.pos.y += this.routes[this.routeIndex].dir.y * step;

        // if end of leg, turn to next leg
        this.routeProgress += step;
        if (this.routeProgress >= this.routes[this.routeIndex].len * TILE_SIZE) {
            if (this.routeIndex + 1 == this.routes.length) {
                this.state = RunnerState.FINISHING;
                this.frame = 0;
            }
            else {
                this.routeIndex += 1;
                this.routeProgress = 0;
            }
        }
    }
    else if (this.state == RunnerState.FINISHING) {
        if (this.frame == NUM_FRAMES[RunnerState.FINISHING])
            return false;
    }
    else if (this.state == RunnerState.DYING) {
        if (this.frame == NUM_FRAMES[RunnerState.DYING])
            return false;
    }

    return true;
};

Runner.prototype.erase = function (ctx) {
    ctx.clearRect(this.pos.x, this.pos.y, ACTOR_SIZE, ACTOR_SIZE + 4);
}

Runner.prototype.draw = function (ctx) {
    var frameX = this.frame;
    if (this.state == RunnerState.RUNNING) {
        switch (this.routes[this.routeIndex].dir) {
            case Direction.UP: var frameY = 0; break;
            case Direction.LEFT: var frameY = 1; break;
            case Direction.DOWN: var frameY = 2; break;
            case Direction.RIGHT: var frameY = 3; break;
        }
    }
    else if (this.state == RunnerState.FINISHING) {
        switch (this.routes[this.routeIndex].dir) {
            case Direction.UP: var frameY = 8; break;
            case Direction.LEFT: var frameY = 9; break;
            case Direction.DOWN: var frameY = 10; break;
            case Direction.RIGHT: var frameY = 11; break;
        }
    }
    else if (this.state == RunnerState.DYING) {
        var frameY = 12;
    }

    // Clear tile to solid color
    //this.canvasContext.fillRect(dest.left, dest.top, dest.width + 1, dest.height + 1);

    //ctx.clearRect(this.pos.x, this.pos.y, ACTOR_SIZE, ACTOR_SIZE);
    ctx.drawImage(SPRITES_IMG, frameX * (ACTOR_SIZE + 2), frameY * (ACTOR_SIZE + 2), ACTOR_SIZE, ACTOR_SIZE, this.pos.x, this.pos.y, ACTOR_SIZE, ACTOR_SIZE);
};

Runner.prototype.kill = function () {
    this.frame = 0;
    this.state = RunnerState.DYING;
}

Runner.prototype.calcSpeedBonus = function () {
    var totalDistance = 0;
    var traveledDistance = 0;

    for (var r in this.routes) {
        totalDistance += this.routes[r].len * TILE_SIZE;

        if (r < this.routeIndex) {
            traveledDistance += this.routes[r].len * TILE_SIZE;
        }
        else if (r == this.routeIndex) {
            traveledDistance += this.routeProgress;
        }
    }

    var SPEED_BONUS_MULTIPLIER = 30;
    return Math.floor(SPEED_BONUS_MULTIPLIER * (1 - (traveledDistance / totalDistance)));
}