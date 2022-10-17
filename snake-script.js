 gameFrame = document.getElementById('gameFrame');
const ctx = gameFrame.getContext('2d');
const resetButton = document.getElementById('resetButton')

let speedOfGame = 7;

const bgSpace = ctx.createLinearGradient(100, 300, 200, 0);
  bgSpace.addColorStop(0, '#19547b');
//   bgSpace.addColorStop(0.3, '#0f3443');
  bgSpace.addColorStop(1, '#ffd89b');
  bgSpace.addColorStop(0.4, '#34e89e');
  
//random number
function random(max){
    return Math.floor(Math.random() * max);
}

//game over
let isGameOver = 0;

//grid system
let tileCount = 20;
let tileSize = gameFrame.width / tileCount - 2;

//start snake variables
let headX = 10;
let headY = 10;
const snakeTail = [];
let tailLength = 1;

//snake tail
class snakeTile{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//food position 
let foodX = 7;
let foodY = 14;

//score
let score = 0;

//movement snake
let xVelocity = 0;
let yVelocity = 0;

//game loop - main function
function drawGame(){
    
    clearScreen();
    changeSnakePosition();
    appleCollision();

    isGameOver = wallCollision();
    if( isGameOver === 1) return;
    isGameOver = tailCollision();
    if( isGameOver === 2) return;

    drawScore();
    drawFood();
    drawSnake();
    setTimeout(drawGame, 1000/speedOfGame);
}

//update screen
function clearScreen(){
    ctx.fillStyle = bgSpace;
    ctx.fillRect(0,0,gameFrame.width,gameFrame.height);
}

//initial position snake
function drawSnake(){
    ctx.fillStyle = '#f7ff00';
    for (let i = 0; i < snakeTail.length; i++) {
        let part = snakeTail[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount, tileSize , tileSize);
    }
    snakeTail.push(new snakeTile(headX,headY));
    if(snakeTail.length > tailLength){
        snakeTail.shift();
    }
    ctx.fillStyle = 'white';
    ctx.fillRect(headX*tileCount,headY*tileCount, tileSize , tileSize);

}

//position food 
function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX*tileCount, foodY*tileCount, tileSize, tileSize);
}

function drawScore(){
    ctx.fillStyle = 'grey';
    ctx.font = '18px verdana';
    ctx.fillText('score:', gameFrame.width / 1.35, gameFrame.height/19)
    ctx.fillText( score , gameFrame.width / 1.1, gameFrame.height/19)
}

function appleCollision(){
    //collsion apple
    if(foodX === headX && foodY === headY){
        foodY = random(tileCount);
        foodX = random(tileCount);  
        tailLength++;
        score = score + 10;
    } 
}

function wallCollision(){
    if( headX >= tileCount || headY >= tileCount || headX < 0 || headY < 0){
        ctx.fillStyle = 'white';
        ctx.font = '50px verdana';
        ctx.fillText('Game Over!', gameFrame.width / 8, gameFrame.height / 3);
        return 1;
    }
    
}

function tailCollision(){
    for (let i = 0; i < snakeTail.length; i++) {
        let part = snakeTail[i];
        if(snakeTail.length > 3){
            if(part.x === headX && part.y === headY){
                ctx.fillStyle = 'white';
                ctx.font = '50px verdana';
                ctx.fillText('Game Over!', gameFrame.width / 6.5, gameFrame.height / 2);
                return 2;
            }
        }
    }
}

//snake movement
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

//player actions
document.body.addEventListener('keydown',KeyDown);
resetButton.addEventListener('click',() => {
    location.reload();
});


function KeyDown(event){
    //snake movements
    //up
    if(event.keyCode == 38){
        if( yVelocity == 1) return;
        xVelocity = 0;
        yVelocity =-1;
    }
    //down
    if(event.keyCode == 40){
        if( yVelocity == -1) return;
        xVelocity = 0;
        yVelocity = 1;
    }
    //left
    if(event.keyCode == 37){
        if( xVelocity == 1) return;
        xVelocity = -1;
        yVelocity = 0;
    }
    //right
    if(event.keyCode == 39){
        if( xVelocity == -1) return;
        xVelocity = 1;
        yVelocity = 0;
    }
    //reset 
    if(event.keyCode == 80){
        location.reload();
    }
}

drawGame();

