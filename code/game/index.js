/* CANVAS SETUP */
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')


/* DECLARACION DE CONSTANTES */
const GAME_WIDTH = 370
const GAME_HEIGHT = 700
const PLAYER_HEIGHT = 20
const OBSTACLE_CONFIG = [
    { radius: 60, rotationSpeed: 1, lineWidth: 10 },
    { radius: 100, rotationSpeed: 1.5, lineWidth: 10 },
    { radius: 150, rotationSpeed: 2, lineWidth: 20 }
]
const COLORS = ['#fc0083','#35e2eb','#f4eb43','#7233cf']


/* DECLARACION DE VARIABLES */ 
let scaleRatio = null
let previousTime = null
let player = null
let background = null
let obsController = null


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

    const frameDelta = (currentTime - previousTime) / 1000
    previousTime = currentTime

    clearScreen()
    // Update game objects
    player.update(frameDelta, bgMove)
    obsController.update(frameDelta, background.y)

    // Draw game objects
    // background.draw()
    obsController.draw()
    player.draw()

    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)