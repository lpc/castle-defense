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

var Levels = [
    {
        map: 0,
        operator: ' ',
        operand: [0],
        numRunners: 0,
        groupSize: 0
    },
    {
        map: 2,
        operator: '+',
        operand: [3, 4],
        numRunners: 10,
        groupSize: 1,
        numberRangeBegin: 1,
        numberRangeStep: 1
    },
    {
        map: 6,
        operator: '-',
        operand: [3, 4, 5],
        numRunners: 15,
        groupSize: 2,
        numberRangeBegin: 6,
        numberRangeStep: 1
    },
    {
        map: 3,
        operator: '+',
        operand: [6, 7, 8],
        numRunners: 20,
        groupSize: 2,
        numberRangeBegin: 3,
        numberRangeStep: 2
    },
    {
        map: 4,
        operator: '×',
        operand: [3, 4, 5],
        numRunners: 15,
        groupSize: 2,
        numberRangeBegin: 1,
        numberRangeStep: 0
    },
    {
        map: 5,
        operator: '-',
        operand: [7, 8],
        numRunners: 20,
        groupSize: 2,
        numberRangeBegin: 10,
        numberRangeStep: 3
    },
    {
        map: 8,
        operator: '×',
        operand: [6, 7, 8],
        numRunners: 20,
        groupSize: 3,
        numberRangeBegin: 2,
        numberRangeStep: 0
    },
    {
        map: 7,
        operator: '+',
        operand: [12, 13, 14],
        numRunners: 20,
        groupSize: 3,
        numberRangeBegin: 10,
        numberRangeStep: 2
    },
    {
        map: 7,
        operator: '+',
        operand: [16, 17, 18, 26, 27, 28],
        numRunners: 20,
        groupSize: 4,
        numberRangeBegin: 20,
        numberRangeStep: 3
    }
];