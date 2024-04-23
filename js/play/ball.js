class Ball {
    constructor(xPos, yPos, color, ) {
        this.xPos = xPos
        this.yPos = yPos
        this.radius = 15
        this.color = color
        this.speed = 1.75
        this.g = -2
        this.gUse = this.g
        this.jumpDone = false
    }

    draw(context) {
        context.beginPath()
        context.fillStyle = this.color
        context.linewidth = 5
        context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()
    }

    jump(context, yOrigin, count) {
        let t = 1/60
        let v = this.speed + this.gUse * (t * count)

        this.yPos -= (v * this.speed) + (0.5 * this.gUse * (t ** 2))

        if (this.yPos >= yOrigin) {
            this.yPos = yOrigin - this.radius
            this.jumpDone = true
        }

        this.draw(context)
    }

    enableJump() {
        this.jumpDone = false
    }
}