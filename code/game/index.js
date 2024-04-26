/* CANVAS SETUP */
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')


/* DECLARACION DE CONSTANTES */
const GAME_WIDTH = 370
const GAME_HEIGHT = 700
const PLAYER_HEIGHT = 20
const BACKGROUND_SPEED = 0.5


const GAME_SPEED = 0.75


/* DECLARACION DE VARIABLES */ 
let scaleRatio = null
let previousTime = null
let player = null
let background = null


/* SCREEN Y DIMENSIONES */
setScreen()
window.addEventListener('resize', setScreen)
// En caso de cambio de orientacion en celular
if (screen.orientation) {
    screen.orientation.addEventListener('change', setScreen)
}


function gameLoop(currentTime) {
    if (previousTime === null) {
        previousTime = currentTime
        requestAnimationFrame(gameLoop)
        return
    }

    const frameDelta = currentTime - previousTime
    previousTime = currentTime

    clearScreen()
    // Update game objects
    background.update(GAME_SPEED, frameDelta)
    player.update(frameDelta, background)

    // Draw game objects
    background.draw()
    player.draw()

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)