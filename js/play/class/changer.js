class ColorChanger {
    constructor(xPos, yPos) {
        this.xPos = xPos
        this.yPos = yPos
        this.radius = 8
        this.isAlive = true
    }

    draw(context) {
        if (this.isAlive) {
            let changer = new Obstacle(this.xPos, this.yPos, this.radius, 0, this.radius * 2)
            changer.draw(context, 0)
        }
    }
}