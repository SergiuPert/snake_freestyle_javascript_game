import {apiPost} from "./APIs";

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');
let speed = 30;
let tileCount = 20;
let tileSize = canvas.width/tileCount;
let headX = 0;
let headY = 0;
let directionX = 0;
let directionY =0;
let score = 0;

function insertHighscore(score) {
    let response = apiPost("/APIgethighscore", score)
}


function keydown(event) {
    if (event.keyCode === 87 && directionY !== 1) {
        directionY = -1;
        directionX = 0;
    } else if (event.keyCode === 83 && directionY !== -1) {
        directionY = 1;
        directionX = 0;
    } else if (event.keyCode === 68 && directionX !== -1) {
        directionY = 0;
        directionX = 1;
    } else if (event.keyCode === 65 && directionX !== 1) {
        directionY = 0;
        directionX = -1;
    }
}

document.addEventListener('keydown', keydown);

function move_snake() {
    headX += directionX;
    headY += directionY;
}

function clear_screen() {
    ctx.fillStyle = '#62a205';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake () {
    ctx.fillStyle = '#2e312d';
    ctx.fillRect(headX, headY, tileSize, tileSize);
}




function initGame() {
    console.log("aaaa")
    clear_screen();
    drawSnake();
    move_snake();
    setTimeout(initGame, 1000/speed);
}



initGame();
