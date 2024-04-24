class Score {
    constructor() {
        this.xPos = 15
        this.yPos = 40
        this.points = 0
        this.font = 'sans-serif'
        this.textSize = '30px'
        this.color = '#afafaf'
    }

    draw(context) {
        context.font = `${this.textSize} ${this.font}`
        context.fillStyle = this.color
        context.fillText(this.points, this.xPos, this.yPos)
    }
}

class Star {
    constructor(xPos, yPos) {
        this.xPos = xPos
        this.yPos = yPos
        this.radius = 15
        this.color = '#afafaf'
        this.isAlive = true
    }

    draw(context) {
        if (this.isAlive) {
            context.beginPath()
            context.fillStyle = this.color
            context.arc(this.xPos, this.yPos, this.radius, 0, Math.PI * 2, false)
            context.fill()
            context.closePath()
        }
    }
}