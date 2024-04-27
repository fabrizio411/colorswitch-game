//  NO NECESITADO

class Background {
    constructor(ctx, scaleRatio) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.scaleRatio = scaleRatio

        this.x = 0
        this.y = this.height
    }

    move(dy) {
        this.y += dy
        
    }

    
    draw() {
        let rectHeight = this.height / 3

        let newY = this.y

        // this.ctx.fillStyle = '#312f32'
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, newY , this.width, rectHeight)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x, newY - rectHeight, this.width, rectHeight)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, newY - rectHeight * 2, this.width, rectHeight)

        newY = this.y - rectHeight * 3

        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, newY, this.width, rectHeight)
        this.ctx.fillStyle = 'blue'
        this.ctx.fillRect(this.x, newY - rectHeight, this.width, rectHeight)
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.x, newY - rectHeight * 2, this.width, rectHeight)

        if (this.y > (this.height * 2 - rectHeight)) {
            this.y = this.height - rectHeight
        }
    }
}