import {apiPost} from "./APIs.js";


const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');
let speed = 3;
let tileCount = 20;
let tileSize = canvas.width/tileCount;
let headX = 10;
let headY = 10;
let directionX = 0;
let directionY =0;
let score = 0;

function insertHighscore(score) {
    let response = apiPost("/APIgethighscore", score)
}

let appleX = 5;
let appleY = 5;
const snakeParts = [];
let tailSize = 2;

class SnakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
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
    } else if (event.keyCode === 32) {
        directionX = 0;
        directionY = 0;
    }
    console.log(snakeParts);
}

function move_snake() {
    headX += directionX;
    headY += directionY;
}

function clear_screen() {
    ctx.fillStyle = '#62a205';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawSnake () {
    ctx.fillStyle = '#fff500';
    for (let index = 0; index < snakeParts.length; index++) {
        let part = snakeParts[index];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailSize) {
        snakeParts.shift();
    }
    ctx.fillStyle = '#2e312d';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function spawn_apple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function apple_collision() {
    if (appleX === headX && appleY === headY) {
        // appleX = Math.floor(Math.random() * tileCount);
        // appleY = Math.floor(Math.random() * tileCount);
        appleX = 10;
        appleY = 10;
        tailSize++;
        score++;
    }
    for (let index = 0; index < snakeParts.length; index++) {
        if ({x:appleX, y:appleY} == snakeParts[index]) {
            console.log("FUUUUUUUUUU");
        }
    }
}

function draw_score() {
    ctx.fillStyle = '#ffffff';
    ctx.font = "20px Impact, sans serif";
    ctx.fillText("Score " + score, canvas.width - 90, 20);
}

function initGame() {
    clear_screen();
    move_snake();
    apple_collision();
    spawn_apple();
    drawSnake();
    draw_score();
    setTimeout(initGame, 1000/speed);
}

document.addEventListener('keydown', keydown);

initGame();
