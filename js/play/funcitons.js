// **** CANVAS SIZE HANDLERS **** //
function setScreen() {
    scaleRatio = getScaleRatio()
    canvas.width = CANVAS_WIDTH * scaleRatio
    canvas.height = CANVAS_HEIGHT * scaleRatio
    
    if (xPosMiddle) {
        xPosMiddle = canvas.width / 2
        reDraw()
    } else {
        xPosMiddle = canvas.width / 2
    }
    
}


function getScaleRatio() {
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
    )

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    )

    if (screenWidth / screenHeight < CANVAS_WIDTH / CANVAS_HEIGHT) {
        return screenWidth / CANVAS_WIDTH
    } else {
        return screenHeight / CANVAS_HEIGHT
    }
}





// **** RESET FUNCTIONS **** //
function clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

function reDraw() {
    myFinishline.draw(context)
    myScore.draw(context)
    myStar.draw(context)
    myBall.draw(context)
    myColorChanger.draw(context)
    myObstacle.draw(context, currentAngle)
}





// **** GAME CONTROLLERS **** //
function startGame() {
    gameState = 'on'
    if (jumpAnimationFrame) {
        cancelAnimationFrame(jumpAnimationFrame)
    }
    myBall = new Ball(xPosMiddle, CANVAS_HEIGHT - 50, 'white')
    myBall.draw(context)
    countJumpFrame = 0
    isJumping = false
    
    myObstacle = new Obstacle(xPosMiddle, 300, 100, 0.01, 15)
    currentAngle = 0

    myColorChanger = new ColorChanger(xPosMiddle, CANVAS_HEIGHT - 175)
    myColorChanger.draw(context)

    myFinishline = new Finishline(xPosMiddle, 60, CANVAS_WIDTH)
    myFinishline.draw(context)

    myScore = new Score()
    myScore.draw(context)

    myStar = new Star(xPosMiddle, 300)
    myScore.draw(context)
}

function pauseGame() {
    if (gameState === 'on') {
        gameState = 'paused'
        cancelAnimationFrame(jumpAnimationFrame)
        cancelAnimationFrame(rotationAnimationFrame)
    } else if (gameState === 'paused') {
        gameState = 'on'
        requestAnimationFrame(updateJump)
        requestAnimationFrame(rotateObstacle)
    }
}

function endGame() {
    canvas.style.display = 'none'
    document.querySelector('#end-menu').style.display = 'flex'
}





// **** JUMP HANDLERS **** //
function updateJump() {
    isJumping = true

    if (!myBall.jumpDone) {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        myBall.jump(CANVAS_HEIGHT, countJumpFrame)
        handleObsColition(myBall, myObstacle)
        handleChangerColition(myBall, myColorChanger)
        handleStarColition(myBall, myStar, myScore)
        handleFinishColition(myBall, myFinishline)
        reDraw()
        countJumpFrame++
        setTimeout(() => {
            updateJump()
        }, .1);
    } else {
        // cancelAnimationFrame(jumpAnimationFrame)
        myBall.jumpDone = false
        countJumpFrame = 0
        isJumping = false
        return
    }
}
function checkForJump() {
    // Ver game state
    if (gameState === 'paused') {
        return
    }

    // Permite seguir saltando
    if (isJumping) {
        // Cnacela la animacion para empezar otra nueva
        // cancelAnimationFrame(jumpAnimationFrame)
        myBall.jumpDone = true
        countJumpFrame = 0
        updateJump()
    } else {
        updateJump()
    }
}





// **** OBSTACULO ROTACION **** // 
function rotateObstacle() {
    if (myObstacle.currentAngle >= Math.PI * 2) {
        myObstacle.currentAngle = 0
    }
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    reDraw()
    myObstacle.currentAngle += myObstacle.rotationSpeed
    rotationAnimationFrame = requestAnimationFrame(rotateObstacle)
}





// **** COLICIONES **** //
function getDistance(ball, obs) {
    // let result = Math.sqrt(Math.pow(obs.xPos - ball.xPos, 2) + Math.pow(obs.yPos - ball.yPos, 2))
    let result = Math.abs(ball.yPos - obs.yPos)
    return result
}

function getLapPosition(obs) {
    /* ****
    * Rangos de las piezas
    * < 25
    * 25 - 50
    * 50 - 75
    * > 75
    **** */
    let laps = obs.currentAngle / (Math.PI * 2)
    let lapAngle = (laps - Math.floor(laps)) * 100
    return lapAngle
}

function getColorColition(ball, obs) {
    let lapPos = getLapPosition(obs)
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

function checkCirColition(ball, obs) {
    let distance = getDistance(ball, obs)
    if (distance < (ball.radius * 2 + obs.radius)) {
        return true
    } 
}

function checkRectColition(ball, rect) {
    let distance = getDistance(ball, rect)
    if (distance < ball.radius) {
        return true
    }
}

function handleObsColition(ball, obs) {
    // Evitando colision dentro del circulo, solo en el borde.
    if (checkCirColition(ball, obs) && getDistance(ball, obs) > (obs.radius - obs.width + ball.radius)) {
        // Controlando que color hizo colicion
        if (!(getColorColition(ball, obs) === ball.color)) {
            endGame()
        }
    }
}

function handleChangerColition(ball, changer) {
    if (checkCirColition(ball, changer) && changer.isAlive) {
        ball.changeColor()
        changer.isAlive = false
    }
}

function handleStarColition(ball, star, score) {
    if (checkCirColition(ball, star) && star.isAlive) {
        score.points += 1
        star.isAlive = false
    }
}

function handleFinishColition(ball, finishline) {
    if (checkRectColition(ball, finishline)) {
        endGame()
    }
}






// **** UTILS ****//

// Obtener numero random (max no inclisive)
const randomNumber = (min, max) => {
    let result = Math.floor(Math.random() * (max - min) + min)
    return result
}
