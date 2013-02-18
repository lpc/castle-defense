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

var ASSET_MANAGER = new AssetManager();

var SPRITES_IMG;
var TILES_IMG;
var MISC_IMG;

ASSET_MANAGER.queueDownload('Sprites/sprites.png');
ASSET_MANAGER.queueDownload('Sprites/tiles.png');
ASSET_MANAGER.queueDownload('Sprites/player.png');

ASSET_MANAGER.downloadAll(function () {
    SPRITES_IMG = ASSET_MANAGER.getAsset('Sprites/sprites.png');
    TILES_IMG = ASSET_MANAGER.getAsset('Sprites/tiles.png');
    MISC_IMG = ASSET_MANAGER.getAsset('Sprites/player.png');
});

var AUDIO_MANAGER = new AudioManager();

requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function (callback, element) {
         window.setTimeout(callback, 1000 / 60);
     };
})();

var Direction = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
};

drawText = function (ctx, text, x, y, color, size, align) {
    text = text + '';
    ctx.font = 'bold ' + size + 'px sans-serif';
    ctx.textAlign = align;
    ctx.fillStyle = color;

    switch (align) {
        case 'left': ctx.clearRect(x, y, size, size); break;
        case 'center': ctx.clearRect(x, y, size, size); break;
        case 'right': ctx.clearRect(x - (size * text.length * 1.2), y - (size * 0.8), (size * text.length * 1.2), size); break;
        default: throw 'invalid text alignment';
    };
    ctx.fillText(text, x, y);
};

function localStorageSupported() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

getPunchline = function () {
    var punchlineIdx;

    try {
        // if we have local storage, show the punchlines in order. Otherwise, randomize
        if (localStorageSupported()) {
            if (localStorage["punchlineIdx"] == undefined || isNaN(localStorage["punchlineIdx"]))
                localStorage["punchlineIdx"] = 0;

            punchlineIdx = localStorage["punchlineIdx"];

            localStorage["punchlineIdx"] = (parseInt(localStorage["punchlineIdx"]) + 1) % PUNCHLINES.length;
        }
        else
            punchlineIdx = Math.floor(Math.random() * PUNCHLINES.length);
    }
    catch (e) {
        punchlineIdx = Math.floor(Math.random() * PUNCHLINES.length);
    }

    return PUNCHLINES[punchlineIdx];
};

var PUNCHLINES = [
    "press F11 for fullscreen mode",
    "...where the skeletons are out of the closet",
    "...where you let your mind do the fighting",
    "...where numbers are not your enemy",
    "...where archery can destroy scary bones",
    "...where being good at math actually matters",
    "...when it comes to pixels, bigger is better",
    "...now try it while holding your breath",
    "...where being nerdy is cool again",
    "...where you must defend castles in the sky"
];

getScoreComment = function () {
    if(profile.score < 100)
        return "You can do better.";
    else if (profile.score < 1000)
        return "Not bad.";
    else if (profile.score < 2000)
        return "Good work.";
    else if (profile.score < 3000)
        return "Very nice.";
    else if (profile.score < 4000)
        return "Impressive.";
    else if (profile.score < 5000)
        return "Remarkable.";
    else if (profile.score < 6000)
        return "Superb.";
    else if (profile.score < 7000)
        return "Outstanding.";
    else if (profile.score < 8000)
        return "Extraordinary.";
    else if (profile.score < 9000)
        return "Awe-inspiring.";
    else
        return "You're a genius.";
};