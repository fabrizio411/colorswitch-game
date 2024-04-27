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

/* CANVAS RESET */
function clearScreen() {
    // Borra todos los sprites del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function createSprites() {
    // Crea todos los sprites
    // Teniendo en cuanta la escala de la screen
    const playerHeightInGame = PLAYER_HEIGHT * scaleRatio

    player = new Player(ctx, playerHeightInGame, scaleRatio)
    background = new Background(ctx)

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
        // background.move(dy)
        obsController.move(dy)
        return true
    } else {
        return false
    }
}