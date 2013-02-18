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

var WorldState = {
    WELCOME: 0,
    RUNNING: 1,
    LEVELUP: 2,
    GAMEOVER: 3,
    FADING_IN: 4
};

var TILE_SIZE = 32;
var ACTOR_SIZE = 62;
var TILE_SCALE = 1;
var RUNNER_ICON_SIZE = 24;

var RUNNER_DELAY = 15;
var RUNNER_SPACING = 30;

var SCORE_PENALTY_WRONG_ANSWER = 20;
var SCORE_KILL_BONUS = 10;

var LIVES_ICON_SIZE = { x: 30, y: 51 };

function World(bgCanvas) {
    var that = this;

    // canvas
    this.bgCanvas = bgCanvas;
    this.bgCanvasContext = bgCanvas && bgCanvas.getContext('2d');
    this.canvas = document.getElementById('actorCanvas');
    this.canvasContext = this.canvas && this.canvas.getContext('2d');
    this.arrowCanvas = document.getElementById('arrowCanvas');
    this.arrowCanvasContext = this.arrowCanvas && this.arrowCanvas.getContext('2d');

    // timer. a tock occurs once per game update
    this.timer = new Timer();
    this.nextTockIn = 0;
    this.tocks = 0;

    this.state = WorldState.WELCOME;

    this.map = new Map();

    this.runnersRemaining = 0;
    this.nextRunnerAtTock = RUNNER_DELAY;

    this.runners = [];
    this.archers = [];
    this.arrows = [];

    this.level = undefined;

    this.answer = 0;
    this.operator = '+';
    this.operand = 0;
    this.speedBonus = 0;
    this.groupSize = 0;
    this.redrawEquation = true;
    this.redrawLivesRemaining = true;
    this.redrawScore = true;
}

//
// Public functions
//


World.prototype.getCoordsFromPixel = function (pixelX, pixelY) {
    return {
        x: Math.floor((pixelX - ((this.bgCanvas.width / 2) - ((this.map.size.x * TILE_SIZE) / 2))) / TILE_SIZE),
        y: Math.floor((pixelY - ((this.bgCanvas.height / 2) - ((this.map.size.y * TILE_SIZE) / 2))) / TILE_SIZE)
    }
};

World.prototype.reset = function () {
    this.animations = [];
    this.runners = [];
    this.archers = [];
    this.arrows = [];
    this.nextTockIn = 0;
    this.tocks = 0;
    this.speedBonus = 0;
    this.answer = 0;
    this.state = WorldState.WELCOME;
    this.nextRunnerAtTock = RUNNER_DELAY;

    this.redrawEquation = true;
    this.redrawLivesRemaining = true;
    this.redrawScore = true;
}

World.prototype.init = function (level) {
    this.reset();

    // Load the level, or increase difficulty on final level
    if (level >= Levels.length) {
        this.level = Levels[Levels.length - 1];
        this.runnersRemaining = this.level.numRunners + ((level + 1 - Levels.length) * 5);
        this.groupSize = this.level.groupSize + (level + 1 - Levels.length);
        level = Levels.length - 1;
    }
    else {
        this.level = Levels[level];
        this.runnersRemaining = this.level.numRunners;
        this.groupSize = this.level.groupSize;
    }

    this.map.init(Maps[Levels[level].map]);
    this.operator = this.level.operator;
    this.operand = this.level.operand[Math.floor(Math.random() * this.level.operand.length)];

    for (var a in Maps[Levels[level].map].archers) {
        var newArcher = new Archer(Maps[Levels[level].map].archers[a]);
        newArcher.numberRangeBegin = this.level.numberRangeBegin;
        this.setArcherNumber(newArcher);
        this.archers.push(newArcher);
    }
};

World.prototype.start = function (beginLoop) {
    // Ensure that images have been loaded. If not, retry soon
    if (!ASSET_MANAGER.isDone()) {
        var that = this;
        setTimeout(function () { that.start(beginLoop) }, 50);
        return;
    }

    if (beginLoop == true) {
        var that = this;
        (function outerLoop() {
            that.loop();
            requestAnimFrame(outerLoop, that.canvas);
        })();

        if (typeof INIT_COMPLETE === 'function')
            INIT_COMPLETE();

        this.drawWelcome();
    }
    else
        this.drawBackground();
}

World.prototype.loop = function () {
    var elapsed = this.timer.tick();
    this.nextTockIn -= elapsed;

    while (this.nextTockIn < 0) {
        this.nextTockIn += this.timer.maxStep;

        this.update();
    }

    if (this.canvasContext !== null)
        this.draw();
}

World.prototype.drawBackground = function () {
    if (!ASSET_MANAGER.isDone()) return;

    var leftOffset = (this.bgCanvas.width / 2) - ((this.map.size.x * TILE_SIZE * TILE_SCALE) / 2);
    var topOffset = (this.bgCanvas.height / 2) - ((this.map.size.y * TILE_SIZE * TILE_SCALE) / 2);

    this.bgCanvasContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);

    for (var i = 0; i < this.map.size.x; i++) {
        for (var j = 0; j < this.map.size.y; j++) {
            var coords = this.map.getSourceCoords(this.map.getTile(i, j));
            this.bgCanvasContext.drawImage(TILES_IMG, coords.x * (TILE_SIZE + 2), coords.y * (TILE_SIZE + 2), TILE_SIZE, TILE_SIZE, leftOffset + (i * TILE_SIZE * TILE_SCALE), topOffset + (j * TILE_SIZE * TILE_SCALE), TILE_SIZE * TILE_SCALE, TILE_SIZE * TILE_SCALE);
        }
    }
}

World.prototype.eraseCanvases = function () {
    this.canvas.width = this.canvas.width;
    this.bgCanvas.width = this.canvas.width;
    this.arrowCanvas.width = this.canvas.width;
}

World.prototype.drawWelcome = function () {
    this.eraseCanvases();
    this.map.init(Maps[1]);
    this.drawBackground();

    drawText(this.bgCanvasContext, "Welcome to Castle D", 960 / 2, 300, 'white', 42, 'center');
    drawText(this.bgCanvasContext, getPunchline(), 960 / 2, 320, '#555', 14, 'center');

    drawText(this.bgCanvasContext, "Press Enter to Begin", 960 / 2, 400, 'white', 24, 'center');

    drawText(this.bgCanvasContext, "'M' to toggle music", 744, 535, '#555', 14, 'right');
}

World.prototype.drawLevelup = function () {
    this.eraseCanvases();
    this.map.init(Maps[1]);
    this.drawBackground();

    drawText(this.bgCanvasContext, "Level " + profile.level + " Complete!", 960 / 2, 300, 'white', 42, 'center');
    drawText(this.bgCanvasContext, "Speed Bonus: " + this.speedBonus + " points", 960 / 2, 320, '#555', 14, 'center');

    drawText(this.bgCanvasContext, "Press Enter to Continue", 960 / 2, 400, 'white', 24, 'center');
}

World.prototype.drawGameover = function () {
    this.eraseCanvases();
    this.map.init(Maps[1]);
    this.drawBackground();

    drawText(this.bgCanvasContext, "Game Over", 960 / 2, 300, 'white', 42, 'center');
    drawText(this.bgCanvasContext, "Your score was " + profile.score + ". " + getScoreComment(), 960 / 2, 320, '#555', 14, 'center');

    drawText(this.bgCanvasContext, "Press Enter to Continue", 960 / 2, 400, 'white', 24, 'center');
}

World.prototype.draw = function () {
    if (this.state == WorldState.RUNNING || this.state == WorldState.FADING_IN) {
        for (var i = this.runners.length - 1; i >= 0; i--) {
            this.runners[i].erase(this.canvasContext);
        }

        for (var i = this.runners.length - 1; i >= 0; i--) {
            this.runners[i].draw(this.canvasContext);
        }

        for (var i in this.archers) {
            this.archers[i].draw(this.canvasContext);
        }

        for (var i in this.arrows) {
            this.arrows[i].erase(this.arrowCanvasContext);
            this.arrows[i].draw(this.arrowCanvasContext);
        }

        // draw equation
        if (this.redrawEquation || (this.answerFade !== undefined && this.answerFade.active)) {
            this.redrawEquation = false;

            // = sign
            drawText(this.canvasContext, '= ', this.map.equation.x * TILE_SIZE, this.map.equation.y * TILE_SIZE, '#444', 48, 'right');

            // clear answer
            this.canvasContext.clearRect(this.map.equation.x * TILE_SIZE - 2, this.map.equation.y * TILE_SIZE - 60, 196, 160);

            // answer fade
            if (this.answerFade !== undefined && this.answerFade.active) {
                this.answerFade.progress += 1;
                if (this.answerFade.progress == this.answerFade.maxProgress)
                    this.answerFade.active = false;
                else
                    drawText(this.canvasContext, this.answerFade.answer, this.map.equation.x * TILE_SIZE, this.map.equation.y * TILE_SIZE - this.answerFade.progress, "rgba(" + this.answerFade.color + (1 - (this.answerFade.progress / this.answerFade.maxProgress)) + ")", 48, 'left');
            }

            // answer itself
            drawText(this.canvasContext, this.answer == 0 ? '_' : (this.answer + '_'), this.map.equation.x * TILE_SIZE, this.map.equation.y * TILE_SIZE, 'white', 48, 'left');
        }

        if (this.redrawLivesRemaining) {
            this.redrawLivesRemaining = false;

            this.canvasContext.clearRect(this.map.goal.x * TILE_SIZE, this.map.goal.y * TILE_SIZE, LIVES_ICON_SIZE.x + 100, LIVES_ICON_SIZE.y);
            this.canvasContext.drawImage(MISC_IMG, 0, 0, LIVES_ICON_SIZE.x, LIVES_ICON_SIZE.y, this.map.goal.x * TILE_SIZE, this.map.goal.y * TILE_SIZE - 10, LIVES_ICON_SIZE.x, LIVES_ICON_SIZE.y);

            drawText(this.canvasContext, '×' + profile.lives, this.map.goal.x * TILE_SIZE + 35, this.map.goal.y * TILE_SIZE + 32, '#333', 32, 'left');
            drawText(this.canvasContext, '×' + profile.lives, this.map.goal.x * TILE_SIZE + 35, this.map.goal.y * TILE_SIZE + 30, '#777', 32, 'left');
        }

        if (this.redrawScore) {
            this.redrawScore = false;

            this.canvasContext.clearRect(0, 0, 200, 100);
            drawText(this.canvasContext, "Your Score", 20, 20, '#DDD', 14, 'left');
            drawText(this.canvasContext, profile.score, 20, 50, '#DDD', 32, 'left');

            this.canvasContext.clearRect(700, 0, 200, 100);
            drawText(this.canvasContext, "Top Score", 940, 20, '#DDD', 14, 'right');
            drawText(this.canvasContext, profile.topScore, 940, 50, '#DDD', 32, 'right');

        }
    }
};

World.prototype.update = function () {
    if (this.state == WorldState.RUNNING) {
        for (var i = this.runners.length - 1; i >= 0; i--) {
            // if this runner just finished his last frame...
            if (!this.runners[i].update(this.tocks)) {
                // if he finished the run, lose a life
                if (this.runners[i].state == RunnerState.FINISHING) {
                    profile.lives--;
                    AUDIO_MANAGER.play('loseLife');
                    this.redrawLivesRemaining = true;
                    if (profile.lives == 0)
                        gameoverCallback();
                }

                // if this is the last runner, level is complete
                if (this.runnersRemaining == 0 && this.runners.length == 1 && profile.lives > 0)
                    levelupCallback();
                
                // delete the runner
                this.runners[i].erase(this.canvasContext);
                this.runners.splice(i, 1);
                i--;
            }
        }

        // for each archer...
        for (var i = this.archers.length - 1; i >= 0; i--) {
            // if the archer is firing an arrow, create the arrow
            if (this.archers[i].update(this.tocks))
                this.arrows.push(new Arrow({ x: this.archers[i].pos.x + ARROW_SPEED, y: this.archers[i].pos.y }));
        }

        // for each arrow...
        for (var i = this.arrows.length - 1; i >= 0; i--) {
            this.arrows[i].update(this.tocks);

            // if this arrow hit a runner...
            for (var j = 0; j < this.runners.length; j++) {
                if (this.arrows[i].isHittingRunner(this.runners[j])) {
                    // delete the arrow
                    this.arrows[i].erase(this.arrowCanvasContext);
                    this.arrows.splice(i, 1);
                    i--;

                    // kill the runner
                    this.runners[j].kill();

                    // play the sound
                    AUDIO_MANAGER.play('skeletonDeath');

                    // score the kill bonus
                    profile.score += SCORE_KILL_BONUS;
                    this.redrawScore = true;

                    // record the speed bonus
                    this.speedBonus += this.runners[j].calcSpeedBonus();

                    // hurry the next runner along
                    this.addRunner();
                    this.nextRunnerAtTock = this.tocks + RUNNER_DELAY;

                    // stop checking for runners. An arrow can only hit one.
                    break;
                }
            }
        }

        // add the next runner, if it's time to do so
        if (this.tocks >= this.nextRunnerAtTock && this.runners.length < this.groupSize) {
            this.addRunner();

            this.nextRunnerAtTock = this.tocks + RUNNER_SPACING;
        }

        this.tocks++;
    }
};

World.prototype.addRunner = function () {
    if (this.runnersRemaining > 0) {
        var idx = Math.floor(Math.random() * this.map.routes.length);
        this.runners.push(new Runner(this.map.routes[idx].start, this.map.routes[idx].paths));
        this.runnersRemaining--;
    }
};

World.prototype.numberChanged = function () {
    if (this.answer > 0) {
        var isPossibleSolution = false;
        for (var a in this.archers) {
            var curSolution = this.compute(this.archers[a].number, this.operand, this.operator);
            if (curSolution == this.answer) {
                // correct answer
                this.startAnswerFade(this.answer, true);
                this.archers[a].state = ArcherState.FIRING;
                AUDIO_MANAGER.play('archerFire');

                profile.score += this.answer;
                this.redrawScore = true;

                this.setArcherNumber(this.archers[a]);
                this.answer = 0;
                isPossibleSolution = true;
                break;
            }
            else if ((curSolution + '').substr(0, (this.answer + '').length) == this.answer)
                isPossibleSolution = true;
        }

        if (!isPossibleSolution) {
            // incorrect answer
            this.startAnswerFade(this.answer, false);
            AUDIO_MANAGER.play('wrongAnswer');

            profile.score -= SCORE_PENALTY_WRONG_ANSWER;
            if (profile.score < 0) profile.score = 0;
            this.redrawScore = true;

            this.answer = 0;
        }
    }

    this.redrawEquation = true;
};

World.prototype.startAnswerFade = function (answer, isCorrect) {
    this.answerFade = {
        answer: answer,
        color: isCorrect ? "255, 255, 255," : "255, 0, 0,",
        progress: 0,
        maxProgress: 15,
        active: true
    };
}

World.prototype.compute = function (operator1, operator2, operand) {
    switch (operand) {
        case '+': return operator1 + operator2;
        case '-': return operator1 - operator2;
        case '×': return operator1 * operator2;
        case '/': return operator1 / operator2;
    };
}

World.prototype.setArcherNumber = function (archer) {
    do {
        var hitFound = false;
        var newNumber = Math.floor(Math.random() * archer.numberRange) + archer.numberRangeBegin;

        for (var a in this.archers) {
            if (this.archers[a].number == newNumber)
                hitFound = true;
        }
    } while (hitFound);

    archer.number = newNumber;
    archer.numberRangeBegin += this.level.numberRangeStep;
}