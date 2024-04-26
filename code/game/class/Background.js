class Background {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.width = width
        this.height = height
        this.speed = speed
        this.scaleRatio = scaleRatio

        this.x = 0
        this.y = height
    }

    draw() {
        let rectHeight = this.height / 3

        let newY = this.y

        // this.ctx.fillStyle = '#312f32'
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, newY , 50 * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x, newY - rectHeight, 50 * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, newY - rectHeight * 2, 50 * this.scaleRatio, rectHeight)

        newY = this.y - rectHeight * 3

        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, newY, 50 * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x, newY - rectHeight, 50 * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, newY - rectHeight * 2, 50 * this.scaleRatio, rectHeight)

        if (this.y > (this.height * 2 - rectHeight)) {
            this.y = this.height - rectHeight
        }
    }

    update(gameSpeed, frameDelta) {
        this.y += gameSpeed * frameDelta * this.speed * this.scaleRatio
    }
}