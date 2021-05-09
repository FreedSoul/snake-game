const gameFrame = document.getElementById('gameFrame');
const ctx = gameFrame.getContext('2d');

let speedOfGame = 7;

//random number
function random(max){
    return Math.floor(Math.random() * max);
}

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

//movement snake
let xVelocity = 0;
let yVelocity = 0;

//game loop - main function
function drawGame(){
    
    //if(window.onfocus(e)){
    clearScreen();
    changeSnakePosition();
    
    appleCollision();
    wallCollision();
    drawFood();
    drawSnake();
    setTimeout(drawGame, 1000/speedOfGame);
    //}
    
}

//update screen
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,gameFrame.width,gameFrame.height);
}

//initial position snake
function drawSnake(){
    ctx.fillStyle = 'orange';
    for (let i = 0; i < snakeTail.length; i++) {
        let part = snakeTail[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount, tileSize , tileSize);
    }
    snakeTail.push(new snakeTile(headX,headY));
    if(snakeTail.length > tailLength){
        snakeTail.shift();
    }
    ctx.fillStyle = 'white'
    ctx.fillRect(headX*tileCount,headY*tileCount, tileSize , tileSize);

}

//position food 
function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX*tileCount, foodY*tileCount, tileSize, tileSize);
}

function appleCollision(){
    //collsion apple
    if(foodX === headX && foodY === headY){
        foodY = random(tileCount);
        foodX = random(tileCount);  
        tailLength++;
    } 
}

function wallCollision(){
    if( headX >= tileCount || headY >= tileCount || headX < 0 || headY < 0){
        ctx.fillStyle = 'white';
        ctx.font = '50px verdana';
        ctx.fillText('Game Over!', gameFrame.width / 6.5, gameFrame.height / 2);
        return 1;
    }
}

//snake movement
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

//player actions
document.body.addEventListener('keydown',KeyDown);

function KeyDown(event){
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
}



drawGame();

