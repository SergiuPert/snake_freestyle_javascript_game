import {apiGet, apiPost, apiPut} from "./APIs.js";

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');
const eat = new Audio('./static/sound/yeeeBoi.mp3');
const music = new Audio('./static/sound/TerrariaMusic-Jungle.mp3');
music.volume = 0.1;
const deathSound = new Audio('./static/sound/death.mp3');
const grass = new Image();
grass.src = './static/images/grass2.jpg';
const snakeHead = new Image();
snakeHead.src = './static/images/snake-head.png';
const snakeBody = new Image();
snakeBody.src = './static/images/snake-body.png';
const bebe = new Image();
bebe.src = './static/images/bebe.png';
let speed = 3;
let tileCount = 40;
let tileSize = canvas.width/(tileCount/2);
let headX = 10;
let headY = 10;
let directionX = 0;
let directionY =0;
let score = 0;
let username;
apiGet("/API-get-active-user")
    .then(result => {username= result.username});

let insertHighscoreButton = document.getElementById("insert_highscore")
insertHighscoreButton.addEventListener('click', ev => insertHighscore(350))
function insertHighscore(score) {
    let new_score = {"highscore": score, "username": username}
    apiPut("/API-insert-highscore", new_score).then(r => console.log("Highscore changed!"));
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
        document.removeEventListener('keydown', keydown);
    } else if (event.keyCode === 83 && directionY !== -1) {
        directionY = 1;
        directionX = 0;
        document.removeEventListener('keydown', keydown);
    } else if (event.keyCode === 68 && directionX !== -1) {
        directionY = 0;
        directionX = 1;
        document.removeEventListener('keydown', keydown);
    } else if (event.keyCode === 65 && directionX !== 1) {
        directionY = 0;
        directionX = -1;
        document.removeEventListener('keydown', keydown);
    } else if (event.keyCode === 27) {
        let overlapDiv = document.getElementById("overlap_div");
        overlapDiv.style.visibility="hidden";
        overlapDiv.innerHTML = "";
        document.removeEventListener('keydown', keydown);
    }
}

function move_snake() {
    headX += directionX;
    headY += directionY;
}

function clear_screen() {
    ctx.drawImage(grass, 0,0,canvas.width,canvas.height);
}

function drawSnake () {
    ctx.fillStyle = '#2e312d';
    for (let index = 0; index < snakeParts.length; index++) {
        let part = snakeParts[index];
        ctx.drawImage(snakeBody,part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }
    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailSize) {
        snakeParts.shift();
    }
    ctx.drawImage(snakeHead,headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function spawn_apple() {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    ctx.drawImage(bebe,appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function apple_collision() {
    for (let index = 0; index < snakeParts.length; index++) {
        let part = snakeParts[index]
        if (part.x === appleX && part.y === appleY) {
            appleX = Math.floor(Math.random() * (tileCount/2));
            appleY = Math.floor(Math.random() * (tileCount/2));

        }
    }
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * (tileCount/2));
        appleY = Math.floor(Math.random() * (tileCount/2));
        tailSize++;
        score++;
        speed = 3 * (1 + score/5);
        eat.play();
        console.log(speed);
    }
}

function draw_score() {
    ctx.fillStyle = '#ffffff';
    ctx.font = "20px Impact, sans serif";
    ctx.fillText("Score " + score, canvas.width - 80, 20);
}

function isGameOver() {
    let gameOver = false;
    if (directionX === 0 && directionY === 0) {
        setTimeout(playMusic, 1000/speed);
        return false;
    }
    for (let index = 0; index <snakeParts.length; index++) {
        let part = snakeParts[index];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    if (headX < 0 || headX === tileCount/2 || headY < 0 || headY === tileCount/2) {
        gameOver = true;
    }
    return gameOver;
}

async function playMusic() {
    await music.play();
    setInterval(playMusic, 164000);
}


function initGame() {
    document.addEventListener('keydown', keydown);
    move_snake();
    if (isGameOver()) {
        deathSound.play();
        ctx.fillStyle = '#ffffff';
        ctx.font = "60px Impact, sans serif";
        ctx.fillText("Game Over!", canvas.width/6, canvas.height/2);
        return;
    }
    clear_screen();
    apple_collision();
    spawn_apple();
    drawSnake();
    draw_score();
    setTimeout(initGame, 1000/speed);
}


initGame();
