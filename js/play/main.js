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



// **** BALL INICIALIZACON **** //
const myBall = new Ball(xPosMiddle, canvasHeight - 50, 'white')
myBall.draw(context)
let count = 0
let isJumping = false
let jumpAnimationFrame





// **** JUMP HANDLERS **** //
function updateJump() {
    if (!myBall.jumpDone) {
        isJumping = true
        jumpAnimationFrame = requestAnimationFrame(updateJump)
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        myBall.jump(canvasHeight, count)
        handleObsColition(myBall, myObstacle)
        handleChangerColition(myBall, myColorChanger)
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





// **** OBSTACULO **** // 
const myObstacle = new Obstacle(xPosMiddle, 250, 100, 1, 15)

let currentAngle = 0
function rotateObstacle() {
    context.clearRect(0, 0, canvasWidth, canvasHeight)
    reDraw()
    currentAngle += 0.005
    requestAnimationFrame(rotateObstacle)
}

requestAnimationFrame(rotateObstacle)




// **** COLOR CHANGER **** //
const myColorChanger = new ColorChanger(xPosMiddle, canvasHeight - 200)
myColorChanger.draw(context)




// **** REDIBUJAR TODO **** //
function reDraw() {
    myBall.draw(context)
    myObstacle.draw(context, currentAngle)
    myColorChanger.draw(context)
}





// **** COLICIONES **** //
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
    let laps = currentAngle / (Math.PI * 2)
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
    if (distance < (ball.radius + obs.radius)) {
        return true
    } 
}

function handleObsColition(ball, obs) {
    // Evitando colision dentro del circulo, solo en el borde.
    if (checkColition(ball, obs) && getDistance(ball, obs) > (obs.radius - obs.width + ball.radius)) {
        // Controlando que color hizo colicion
        if (!(getColorColition(ball, obs) === ball.color)) {
            alert('fuiste')
        }
    }
}

function handleChangerColition (ball, changer) {
    if (checkColition(ball, changer) && changer.isAlive) {
        console.log('true')
        ball.changeColor()
        changer.isAlive = false
    }
}