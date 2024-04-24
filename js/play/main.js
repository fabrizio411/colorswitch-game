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
        myBall.jump(canvasHeight, count)
        checkColition(myBall, myObstacle)
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
const myObstacle = new Obstacle(canvasWidth / 2, 300, 100, 1, 15)

let currentAngle = 0
function rotateObstacle() {
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    reDraw()
    currentAngle += 0.005
    requestAnimationFrame(rotateObstacle)
}

requestAnimationFrame(rotateObstacle)

function reDraw() {
    myBall.draw(context)
    myObstacle.draw(context, currentAngle)
}

// Coliciones
function getDistance(ball, obs) {
    let result = Math.sqrt(Math.pow(obs.xPos - ball.xPos, 2) + Math.pow(obs.yPos - ball.yPos, 2))
    return result
}

function getLapPosition() {
    /* ****
    * Rangos de las piezas
    * < 25
    * 25 - 50
    * 50 - 75
    * > 75
    **** */
    let laps = currentAngle / 6
    let lapAngle = (laps - Math.floor(laps)) * 100
    return lapAngle
}

function getColorColition(ball, obs) {
    let lapPos = getLapPosition()
    let clrIndex

    if ((ball.yPos - obs.yPos) > 0) {
        // Contacto con parte inferior
        if (lapPos < 25) {
            clrIndex = 0
        } else if (lapPos < 50) {
            clrIndex = 3
        } else if (lapPos < 75) {
            clrIndex = 2
        } else {
            clrIndex = 1
        }
    } else {
        // Contacto con parte superior
        if (lapPos < 25) {
            clrIndex = 2
        } else if (lapPos < 50) {
            clrIndex = 1
        } else if (lapPos < 75) {
            clrIndex = 0
        } else {
            clrIndex = 3
        }
    }

    return colors[clrIndex]
}

function checkColition(ball, obs) {
    let distance = getDistance(ball, obs)

    if (distance < (ball.radius + obs.radius) && distance > (obs.radius - obs.width + ball.radius)) {
        if (!(getColorColition(ball, obs) === ball.color)) {
            alert('funca')
        }
    } 
}