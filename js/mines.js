'use strict'

var gNgsCount = 0;
const MINE = '💣'



function randomMinesLoction() {
    if (gClicksCount === 0) {
        gStopTimer = setInterval(startTimer, 1000)
        for (var i = 0; i < gLevel.mines; i++) {
            var idx = getRandomInt(0, gEmptyLocations.length - 1)
            var emptyLoction = gEmptyLocations[idx]
            gBoard[emptyLoction.i][emptyLoction.j].isMine = true
            gEmptyLocations.splice(idx, 1)
        }
    }
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var count = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j == cellJ) continue
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) {
                count++
            }
        }
    }
    if (count === 0) count = ''
    gBoard[cellI][cellJ].minesAroundCount = count
}

function checkMine(elCell, i, j) {
    var cell = gBoard[i][j]
    var value;
    if (cell.isMine) {
        value = MINE
        gLivesCount--
        countLivesFlags()
    } else {
        value = gBoard[i][j].minesAroundCount
        checkVictory(i, j)
    }
    elCell.classList.add('clicked')
    renderCell(i, j, value)
}