/*!
 * Conways's Game of Life implementation
 *
 * Date: 2013-10-28
 */
"use strict";
var rows = 35
, columns = 60
, aliveCellColour = "rgb(238, 135, 42)"
, deadCellColour = "rgb(240, 255, 255)"
, cellSize = "10px"
, tickTimeout = 500
, runner;

var getId = function getIdF(row, column) {
    return 'r' + row.toString() + 'c' + column.toString();
};

var changeColor = function changeColorF(id) {
    var cell = document.getElementById(id);
    if ($('#' + id).css('border-color') === aliveCellColour) {
        cell.style.borderColor = deadCellColour;
    } else {
        cell.style.borderColor = aliveCellColour;
    }
};

var getCellNextState = function getCellNextStateF(id) {
    var aliveNeighbours = countAliveNeighbours(id)
        , state;
    if (isAlive(id)) {
        if (aliveNeighbours === 2 || aliveNeighbours === 3) {
            state = 'alive';
        } else {
            state = 'dead';
        }
    } else {
        if (aliveNeighbours === 3) {
            state = 'alive';
        } else {
            state = 'dead';
        }
    }
    return state;
};

var countAliveNeighbours = function countAliveNeighboursF(id) {
   var aliveNeighbours = 0
   , row = id.split('r')[1].split('c')[0]
   , column = id.split('c')[1]
   , id
   , neighbours = {}
   , hasOwn = Object.prototype.hasOwnProperty
   , i
   , rowNr
   , columnNr;

    if (row != null && column != null) {
       rowNr = Number(row);
       columnNr = Number(column);
       neighbours = {
              1:getId(rowNr - 1, columnNr - 1)
              , 2:getId(rowNr - 1, columnNr)
              , 3:getId(rowNr -1 , columnNr + 1)
              , 4:getId(rowNr, columnNr - 1)
              , 5:getId(rowNr, columnNr + 1)
              , 6:getId(rowNr + 1, columnNr - 1)
              , 7:getId(rowNr + 1, columnNr)
              , 8:getId(rowNr + 1, columnNr + 1)
              };
       for (i in neighbours) {
           if (hasOwn.call(neighbours, i)) {
                if (isAlive(neighbours[i])) {
                 aliveNeighbours += 1;
                }
           }
       }
   }
   return aliveNeighbours;
};

var isAlive = function isAliveF(id) {
    return $('#' + id).css('border-color') === aliveCellColour;
};

var changeState = function changeStateF(id, state) {
    var cell = document.getElementById(id);
    if (state === 'dead') {
        cell.style.borderColor = deadCellColour;
    } else {
        cell.style.borderColor = aliveCellColour;
    }
};

var tick = function tickF() {
    var map = getNextState()
     , row
     , column
     , id;
    for (row = 0; row < rows; row += 1) {
        for (column = 0; column < columns; column += 1) {
            var id = getId(row, column)
            , state = map[id];
            changeState(id, state);
        }
    }
};

var getNextState = function getNextStateF() {
    var row
    , column
    , id
    , map = {};
    for (row = 0; row < rows; row += 1) {
        for (column = 0; column < columns; column += 1) {
            id = getId(row, column);
            map[id] = getCellNextState(id);
        }
    }
    return map;
}

var cellClicked = function cellClickedF(divId) {
    changeColor(divId);
};

var start = function startF() {
    runner = setInterval(function () { tick(); }, tickTimeout);
};

var stop = function stopF() {
    clearInterval(runner);
};

var createTable = function createTableF() {
    var tbl = document.createElement('table')
    , row
    , tr
    , column
    , td
    , id
    , div;
    tbl.cellSpacing = "0";
    for (row = 0; row < rows; row += 1) {
        tr = tbl.insertRow();
        for (column = 0; column < columns; column += 1) {
            td = tr.insertCell();
            if (td.addEventListener) {  // all browsers except IE before version 9
                td.addEventListener("click", function () { cellClicked(this.firstChild.id); }, false);
            } else {
                if (td.attachEvent) {   // IE before version 9
                    td.attachEvent("click", function () { cellClicked(this.firstChild.id); });
                }
            }
            id = getId(row, column);
            div = document.createElement("div");
            div.setAttribute('id', id);
            div.style.border = cellSize + " solid " + deadCellColour;
            div.style.borderRadius = "20";
            td.appendChild(div);
        }
    }
    document.body.appendChild(tbl);
};
