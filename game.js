/*!
 * Conways's Game of Life implementation
 *
 * Date: 2013-10-28
 */
"use strict";
var rows = 20;
var columns = 20;
var aliveCellColour = "rgb(238, 135, 42)";
var deadCellColour = "rgb(240, 255, 255)";
var cellSize = "20px";
var tickTimeout = 1000;
var runner;

function getId(row, column) {
    return 'r' + row.toString() + 'c' + column.toString();
}

function changeColor(id) {
    var dot = document.getElementById(id);        
    if ($('#' + id).css('border-color') === aliveCellColour) {
        dot.style.borderColor = deadCellColour;
    } else {
        dot.style.borderColor = aliveCellColour;
    }
}

function tick() {
    var row,
        column,
        id;
    for (row = 0; row < rows; row += 1) {
        for (column = 0; column < columns; column += 1) {
            id = getId(row, column);
            // TO DO: replace this with Game of life rules
            changeColor(id);
        }
    }
}

function cellClicked(divId) {
    changeColor(divId);
}

function start() {
    runner = setInterval(function () { tick(); }, tickTimeout);
}

function stop() {
    clearInterval(runner);
}

function createTable() {
    var tbl = document.createElement('table'),
        row,
        tr,
        column,
        td,
        id,
        div;
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
}