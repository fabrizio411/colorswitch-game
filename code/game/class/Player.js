class Player {
    frameCount = 0
    jumpInProgress = false
    JUMP_SPEED = 1.7
    GRAVITY = -0.007

    constructor(ctx, height, scaleRatio) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.height = height
        this.width = this.height
        this.scaleRatio = scaleRatio

        this.x = (this.canvas.width / 2) - (this.width / 2 * scaleRatio)
        this.y = this.canvas.height - 75 * scaleRatio

        this.image = new Image()
        this.image.src = '../../../imgs/player/p0.svg'

        /* LISTENERS */
        window.removeEventListener('click', () => this.checkJump())
        window.addEventListener('click', () => this.checkJump())
     
    }

    update(frameDelta, background) {
        this.jump(frameDelta, background)
        // if (this.jumpInProgress) {
        //     // Check colitions
        // }
    }

    checkJump() {
        if (!this.jumpInProgress) {
            this.jumpInProgress = true
        } else {
            this.frameCount = 0
        }
    }

    jump(frameDelta, background) {
        if (this.jumpInProgress) {
            let backgroundMoving = false

            let v = this.JUMP_SPEED + this.GRAVITY * (frameDelta * this.frameCount)
            let temporalY = this.y - (v * this.JUMP_SPEED) * this.scaleRatio + (0.5 * this.GRAVITY * (frameDelta ** 2))
            
            if (this.y < this.canvas.height / 2) {
                backgroundMoving = background.move(this.y - temporalY)
            }

            if (!backgroundMoving) {
                this.y = temporalY
            }

            if (this.y + this.height >= this.canvas.height) {
                this.y = this.canvas.height - this.height
            }

            this.frameCount++
        }
    }

    
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}