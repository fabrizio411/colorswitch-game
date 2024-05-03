/* SCREEN Y DIMENSIONES DEL CANVAS */ 
function setScreen() {
    // Ajustar el tamaño del canvas a pantalla
    scaleRatio = getScaleRatio()
    canvas.width = GAME_WIDTH * scaleRatio
    canvas.height = GAME_HEIGHT * scaleRatio
    createSprites()
}

function getScaleRatio() {
    // Obtiene la escala de la pantalla
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
    )

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    )

    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
        return screenWidth / GAME_WIDTH
    } else {
        return screenHeight / GAME_HEIGHT
    }
}

/* MENU CONTROLLERS */
function showGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function setupGameReset() {
    if (!hasOpenedMenu) {
        hasOpenedMenu = true
        runScore = score.points

        let storageBestScore = localStorage.getItem('bestScore')
        if (storageBestScore !== null) {
            storageBestScore = JSON.parse(storageBestScore)
            if (runScore > storageBestScore) {
                bestScore = runScore
                localStorage.setItem('bestScore', JSON.stringify(bestScore))
            } else {
                bestScore = storageBestScore
            }
        } else {
            bestScore = runScore
            localStorage.setItem('bestScore', JSON.stringify(bestScore))
        }

        let storageTotalPoints = localStorage.getItem('totalPoints')
        if (storageTotalPoints !== null) {
            storageTotalPoints = JSON.parse(storageTotalPoints)

            storageTotalPoints += runScore
            totalPoints = storageTotalPoints
            localStorage.setItem('totalPoints', JSON.stringify(storageTotalPoints))
        } else {
            totalPoints += runScore
            localStorage.setItem('totalPoints', JSON.stringify(totalPoints))
        }

        setTimeout(() => {
            displayGameOverMenu()
        }, 500);
    }
}

function reset() {
    document.querySelector('#end-menu').style.display = 'none'
    hasOpenedMenu = false
    gameOver = false

    playerColorMemory = null
    obstaclesMemory = []

    obsController.reset()
    score.reset()
    player.reset()
}

/* CANVAS RESET */
function clearScreen() {
    // Borra todos los sprites del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function createSprites() {
    // Crea todos los sprites
    // Teniendo en cuanta la escala de la screen
    score = new Score(ctx, scaleRatio)

    const playerRadiusInGame = PLAYER_RADIUS * scaleRatio

    let playerColor = null
    if (playerColorMemory === null) {
        playerColor = getRandomNumber(0, 3)
    } else {
        playerColor = playerColorMemory
    }
    
    player = new Player(ctx, playerRadiusInGame, scaleRatio, COLORS, playerColor)

    // Valores InGame escalados de los obstaculos
    const obstacles = OBSTACLE_CONFIG.map(obs => {
        return {
            radius: obs.radius * scaleRatio,
            lineWidth: obs.lineWidth * scaleRatio,
            rotationSpeed: obs.rotationSpeed
        }
    })

    obsController = new ObsController(ctx, obstacles, scaleRatio, COLORS)
}

/* BACKGROUND MOVEMENT */
function bgMove(dy) {
    if (dy > 0) {
        obsController.move(dy)
        return true
    } else {
        return false
    }
}

/* UTILS */
function getRandomNumber(min, max) {
    // Obtiene un numero random entre el minimo y el maximo
    return Math.floor(Math.random() * (max - min + 1) + min)
}