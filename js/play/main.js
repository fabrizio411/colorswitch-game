// **** CANVAS SETUP **** //
const canvas = document.querySelector('#canvas')

const CANVAS_WIDTH = 370
const CANVAS_HEIGHT = 700

let context = canvas.getContext('2d')



//  **** SCREEN SETUP **** //
let scaleRatio
let xPosMiddle

setScreen()
window.addEventListener('resize', setScreen)






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



requestAnimationFrame(rotateObstacle)







// **** LISTENERS **** //
canvas.addEventListener('click', checkForJump)
document.querySelector('#restart-btn').addEventListener('click', () => {
    canvas.style.display = 'block'
    document.querySelector('#end-menu').style.display = 'none'
    startGame()
})