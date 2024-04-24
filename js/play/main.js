// **** CANVAS SETUP **** //
const canvas = document.querySelector('#canvas')

let canvasWidth = 370
let canvasHeight = 700
if (window.innerWidth < 450) {
    canvasWidth = window.innerWidth
    canvasHeight = window.innerHeight
}

canvas.height = canvasHeight
canvas.width = canvasWidth

let context = canvas.getContext('2d')

const xPosMiddle = canvasWidth / 2





// **** LISTENERS **** //
canvas.addEventListener('click', checkForJump)





// **** INICIALIZACION **** //
let gameState
let countJumpFrame
let isJumping
let jumpAnimationFrame
let rotationAnimationFrame
let currentAngle
let myBall
let myObstacle
let myColorChanger
let myFinishline
let myScore

startGame()