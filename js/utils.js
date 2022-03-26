'use strict'



function gameLevel(size, mines) {
    return {
        size: size,
        mines: mines
    }
}

function game() {
    return {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
}

function getEmptylocations() {
    var emptyLocations = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) emptyLocations.push({ i, j })

        }
    }
    return emptyLocations
}


function createMat(ROWS = 4, COLS = 4) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            })
        }
        mat.push(row)
    }
    return mat
}

// location such as: {i: 2, j: 7}
function renderCell(i, j, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.innerHTML = value;
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}