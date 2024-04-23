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

let radius = 30
class Circle {
    constructor(xPos, yPos, radius, color, speed) {
        this.xPos = xPos
        this.yPos = yPos
        this.radius = radius
        this.color = color
        this.speed = speed

        this.dx = 1 * this.speed
        this.dy = 1 * this.speed
    }

    draw(context) {
        context.beginPath()
        context.strokeStyle = this.color
        context.fillStyle = this.color
        context.linewidth = 5
        context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false)
        context.stroke()
        context.fill()
        context.closePath()
    }

    update(context) {
        this.draw(context)

        if ((this.xPos + this.radius) > canvasWidth) {
            this.dx = -this.dx
        }

        if ((this.xPos - this.radius) < 0) {
            this.dx = -this.dx
        }

        if ((this.yPos + this.radius) > canvasHeight) {
            this.dy = -this.dy
        }

        if ((this.yPos - this.radius) < 0) {
            this.dy = -this.dy
        }

        this.xPos += this.dx
        this.yPos += this.dy
    }

    changeDirection() {
        this.dy = -this.dy
        this.dx = -this.dx
    }
}


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


const myBall = new Ball(canvasWidth / 2, canvasHeight - 50, 'white')
myBall.draw(context)
let count = 0
let isJumping = false
let jumpAnimationFrame

const updateJump = () => {
    if(!myBall.jumpDone) {
        isJumping = true
        jumpAnimationFrame = requestAnimationFrame(updateJump)
        context.clearRect(0, 0, canvasWidth, canvasHeight)
        myBall.jump(context, canvasHeight, count)
        count++
    } else {
        isJumping = false
        myBall.enableJump()
        count = 0
    }
}

const checkForJump = () => {
    console.log(isJumping)
    if (isJumping) {
        cancelAnimationFrame(jumpAnimationFrame)
        count = 0
        updateJump()
    } else {
        updateJump()
    }
}

document.addEventListener('click', checkForJump)