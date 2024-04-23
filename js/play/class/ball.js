class Ball {
    constructor(xPos, yPos, color) {
        this.xPos = xPos
        this.yPos = yPos
        this.radius = 10
        this.color = color
        this.speed = 1.75
        this.g = -2
        this.jumpDone = false
    }

    draw(context) {
        context.beginPath()
        context.fillStyle = this.color
        context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false)
        context.fill()
        context.closePath()
    }

    jump(context, yOrigin, count, animationFrame) {
        // Ecuaciones de proyectiles en una dimencion para controla salto
        let t = 1/60
        let v = this.speed + this.g * (t * count)

        this.yPos -= (v * this.speed) + (0.5 * this.g * (t ** 2))

        // En caso de que no se vuelva a saltar, frenar la caida en el piso
        if (this.yPos + this.radius >= yOrigin) {
            this.yPos = yOrigin - this.radius
            this.jumpDone = true
        }

        this.draw(context)
    }
}