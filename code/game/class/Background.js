class Background {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.width = width
        this.height = height
        this.speed = speed
        this.scaleRatio = scaleRatio

        this.x = (this.canvas.width / 2) - this.width / 2 * scaleRatio
        this.y = height
    }

    update(gameSpeed, frameDelta) {
        // this.y += gameSpeed * frameDelta * this.speed * this.scaleRatio
    }

    move(dy) {
        console.log(dy)

        if (dy > 0) {
            this.y += dy
            return true
        } else {
            return false
        }
    }

    draw() {
        let rectHeight = this.height / 3

        let newY = this.y

        // this.ctx.fillStyle = '#312f32'
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, newY , this.width * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x, newY - rectHeight, this.width * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, newY - rectHeight * 2, this.width * this.scaleRatio, rectHeight)

        newY = this.y - rectHeight * 3

        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, newY, this.width * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x, newY - rectHeight, this.width * this.scaleRatio, rectHeight)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, newY - rectHeight * 2, this.width * this.scaleRatio, rectHeight)

        if (this.y > (this.height * 2 - rectHeight)) {
            this.y = this.height - rectHeight
        }
    }
}