// Canvas Setup
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



// Coliciones
// const getDistance = (xPos1, yPos1, xPos2, yPos2) => {
//     let result = Math.sqrt(Math.pow(xPos2 - xPos1, 2) + Math.pow(yPos2 - yPos1, 2))
//     return result
// }

// Obtener numero random
// const randomNumber = (min, max) => {
//     let result = Math.random() * (max - min) + min
//     return result
// }


// Ball Inicializacion
const myBall = new Ball(canvasWidth / 2, canvasHeight - 50, 'white')
myBall.draw(context)
let count = 0
let isJumping = false
let jumpAnimationFrame

// Jump handlers
function updateJump() {
    if (!myBall.jumpDone) {
        isJumping = true
        jumpAnimationFrame = requestAnimationFrame(updateJump)
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        myBall.jump(context, canvasHeight, count, jumpAnimationFrame)
        reDraw()
        count++
    } else {
        cancelAnimationFrame(jumpAnimationFrame)
        myBall.jumpDone = false
        count = 0
    }
}
function checkForJump() {
    // Permite seguir saltando
    if (isJumping) {
        // Cnacela la animacion para empezar otra nueva
        cancelAnimationFrame(jumpAnimationFrame)
        count = 0
        updateJump()
    } else {
        updateJump()
    }
}

document.addEventListener('click', checkForJump)

// Obstacle Inicializacion
const myObstacle = new Obstacle(canvasWidth / 2, 300, 50, 1, 10)

let currentAngle = 0
function rotateObstacle() {
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    reDraw()
    currentAngle += 0.02
    requestAnimationFrame(rotateObstacle)
}

requestAnimationFrame(rotateObstacle)



function reDraw() {
    myBall.draw(context)
    myObstacle.draw(context, currentAngle)
}