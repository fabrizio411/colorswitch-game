class Player {
    constructor(ctx, height, jumpHeight, scaleRatio) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.height = height
        this.width = this.height
        this.jumpHeight = jumpHeight
        this.scaleRatio = scaleRatio

        this.x = (this.canvas.width / 2) - (this.width / 2 * scaleRatio)
        this.y = this.canvas.height - 75 * scaleRatio

        this.image = new Image()
        this.image.src = '../../../imgs/player/p0.svg'
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}