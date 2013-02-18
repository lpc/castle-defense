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

loadHighscore = function () {
    if (localStorageSupported()) {
        try {
            if (localStorage["topScore"] == undefined || isNaN(localStorage["topScore"]))
                localStorage["topScore"] = 0;

            profile.topScore = parseInt(localStorage["topScore"]);
        }
        catch (e) {
            profile.topScore = 0;
        }
    }
};

saveHighscore = function () {
    if (profile.score > profile.topScore) {
        profile.topScore = profile.score;
    }

    if (localStorageSupported()) {
        try {
            if (localStorage["topScore"] == undefined || isNaN(localStorage["topScore"]))
                localStorage["topScore"] = 0;

            if (parseInt(localStorage["topScore"]) < profile.score)
                localStorage["topScore"] = profile.score;
        }
        catch (e) {
        }
    }
};