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

function AudioManager() {
}

AudioManager.prototype.play = function (data) {
    var audio = document.getElementById(data + 'Audio');

    try {
        if (audio != null) {
            audio.currentTime = 0;
            audio.play();
        }
    }
    catch (e) { }
}

AudioManager.prototype.pause = function (data) {
    var audio = document.getElementById(data + 'Audio');

    try {
        if (audio != null) {
            audio.pause();
        }
    }
    catch (e) { }
}