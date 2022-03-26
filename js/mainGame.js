'use strict'
console.log('minesweeper:')

const FLAG = '🚩'

var gBoard;
var gLevel;
var gGame;
var gLivesCount;
var gClicksCount
var gEmptyLocations;
var gEvet;
var gElTimer = document.querySelector('.timer');
var gTimerCount = 0
var gStopTimer;
var gFlagsCount;

function init(size, mines) {
    gClicksCount = 0;
    clearInterval(gStopTimer)
    closeModal()
    gLivesCount = (size === 4) ? 2 : 3
    gFlagsCount = (size === 4) ? 5 : 12
    countLivesFlags()
    gElTimer.innerText = '0'
    gTimerCount = 0
    gLevel = gameLevel(size, mines)
    gBoard = createMat(gLevel.size, gLevel.size)
    gGame = game()
    gEmptyLocations = getEmptylocations()
    renderBoard(gBoard)
}

function getSafeClick() {
    var idx = getRandomInt(0, gBoard[i][j].length)
    var emptyLocation = gEmptyLocations
    gBoard[emptyLocation.i][emptyLocation.j]
}

function startTimer() {
    ++gTimerCount
    var hour = Math.floor(gTimerCount / 3600);
    var minute = Math.floor((gTimerCount - hour * 3600) / 60);
    var seconds = gTimerCount - (hour * 3600 + minute * 60);
    document.querySelector(".timer").innerHTML = minute + ":" + seconds;
}


function countLivesFlags() {
    var elLives = document.querySelector('.lives span')
    elLives.innerText = gLivesCount
    if (!gLivesCount) gameOver('you lose')
    var elFlag = document.querySelector('.flags span')
    elFlag.innerText = gFlagsCount
}




function gameOver(msg) {
    console.log('gameOver')
    var elHeader3 = document.querySelector('h3')
    elHeader3.innerText = '☹️'
    openModal(msg)
    clearInterval(gStopTimer)
}

function checkVictory() {
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine && gBoard[i][j].isMarked) {
                count++;
            }
        }
    }
    if ((gLivesCount > 0 || count === gLevel.mines) && (gLevel.size ** 2 - gLevel.mines) === gGame.shownCount) {
        gameOver('Victory!')
    }

}

function openModal(msg) {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    elModal.querySelector('span').innerText = msg
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    var elHeader3 = document.querySelector('h3')
    elHeader3.innerText = '🙂'
}

function addFlag(ev, cellI, cellJ) {
    ev.preventDefault()
    var value;
    var currCell = gBoard[cellI][cellJ]
    if (currCell.isShown) return
    if (!currCell.isMarked) {
        currCell.isMarked = true
        value = FLAG
        gFlagsCount--
    } else {
        currCell.isMarked = false
        value = ''
        gFlagsCount++
    }
    countLivesFlags()
    gGame.markedCount = gFlagsCount
    renderCell(cellI, cellJ, value)
}

// recorsia not working
function ngsAround(cellI, cellJ) {
    var value
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j == cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMarked ||
                gBoard[i][j].isShown ||
                gBoard[i][j].isMine ||
                gBoard[i][j].minesAroundCount !== 0) return
            setMinesNegsCount(cellI, cellJ, gBoard)
        }
    }
    renderCell(i, j, value)
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isShown || gBoard[i][j].isMarked) return
    gBoard[i][j].isShown = true
    gEmptyLocations = getEmptylocations()
    gGame.shownCount++;
    randomMinesLoction(gBoard, i, j)
    setMinesNegsCount(i, j, gBoard)
    checkMine(elCell, i, j)
    gClicksCount++;
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `\t<td oncontextmenu="addFlag(event,${i},${j})"
            onclick="cellClicked(this,${i},${j})" class="cell cell-${i}-${j}" ></td>\n`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}