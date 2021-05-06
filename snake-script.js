const gameFrame = document.getElementById('gameFrame');
const ctx = gameFrame.getContext('2d')

let speedOfGame = 7;

//grid system
let tileCount = 20;
let tileSize = gameFrame.width / tileCount - 2;

//start snake variables
let headX = 10;
let headY = 10;

//food position 
let foodX = Math.floor(Math.random() * gameFrame.width);
let foodY = Math.floor(Math.random() * gameFrame.height);

//movement snake
let xVelocity = 0;
let yVelocity = 0;

//game loop - main function
function drawGame(){
    //console.log(gameFrame.width)
    clearScreen()
    changeSnakePosition()
    drawFood()
    drawSnake()
    collisionSnake()
    setTimeout(drawGame, 1000/speedOfGame)
}

//update screen
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,gameFrame.width,gameFrame.height)
}

//initial position snake
function drawSnake(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX*tileCount,headY*tileCount, tileSize , tileSize)
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

//position food 
function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(foodX,foodY,tileSize,tileSize);
}

function collisionSnake(){
    //collsion apple
    if(foodX === headX && foodY === headY){
        ctx.clearRect( foodX, foodY, tileSize, tileSize)
    } 
}

drawGame();

