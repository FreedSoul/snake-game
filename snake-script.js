const gameFrame = document.getElementById('gameFrame');
const ctx = gameFrame.getContext('2d')

let speedOfGame = 7;

//grid system
let tileCount = 20;
let tileSize = gameFrame.width / tileCount - 2;

//start snake variables
let headX = 10;
let headY = 10;

//movement snake
let xVelocity = 0;
let yVelocity = 0;

//game loop - main function
function drawGame(){
    //console.log(gameFrame.width)
    clearScreen()
    changeSnakePosition()
    drawSnake()
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
    ctx.fillRect(headX*tileCount,headY*tileCount, tileSize,tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

//player actions
document.body.addEventListener('keydown',KeyDown);

function KeyDown(event){
    //up
    if(event.keyCode == 38){
        xVelocity = 0;
        yVelocity =-1;
    }
    //down
    if(event.keyCode == 40){
        xVelocity = 0;
        yVelocity = 1;
    }
    //left
    if(event.keyCode == 37){
        xVelocity = -1;
        yVelocity = 0;
    }
    //right
    if(event.keyCode == 39){
        xVelocity = 1;
        yVelocity = 0;
    }
}


drawGame();

