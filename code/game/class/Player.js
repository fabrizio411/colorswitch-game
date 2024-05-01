class Player {
    jumpInProgress = false
    JUMP_SPEED = 400
    GRAVITY = -1600
    speed = this.JUMP_SPEED


    constructor(ctx, radius, scaleRatio, colors, playerColor) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.radius = radius
        this.scaleRatio = scaleRatio
        this.colors = colors
        this.colorIndex = playerColor
        this.color = this.colors[this.colorIndex]

        this.x = this.canvas.width / 2
        this.y = this.canvas.height - 75 * scaleRatio

        /* LISTENERS */
        window.removeEventListener('click', () => this.checkJump())
        window.addEventListener('click', () => this.checkJump())
     
    }

    update(frameDelta, background, obsController) {
        /////////////////////////////////////////
        //// GLOBAL VARIABLE USAGE (WARNING) ////
        playerColorMemory = this.colorIndex
        /////////////////////////////////////////
        /////////////////////////////////////////
        this.jump(frameDelta, background, obsController)
        // if (this.jumpInProgress) {
        //     // Check colitions
        // }
    }

    checkJump() {
        if (!this.jumpInProgress) {
            this.jumpInProgress = true
        } else {
            this.speed = this.JUMP_SPEED
        }
    }

    jump(frameDelta, bgMove) {
        if (this.jumpInProgress) {
            let backgroundMoving = false

            // Calculo de la posicion
            this.speed += this.GRAVITY * frameDelta
            let temporalY = this.y - this.speed * frameDelta * this.scaleRatio

            // Handler del movimiento del background
            if (this.y < this.canvas.height / 2) {
                let dy = this.y - temporalY
                backgroundMoving = bgMove(dy)
            }

            // Movimiento del player
            if (!backgroundMoving) {
                this.y = temporalY
            }

            // Limite de caida del player
            if ((this.y + this.radius) >= this.canvas.height) {
                this.y = this.canvas.height - this.radius
            }
        }
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false
        )
        this.ctx.fill()
        this.ctx.closePath()
    }

    getRandomNumber(min, max) {
        // Obtiene un numero random entre el minimo y el maximo
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}