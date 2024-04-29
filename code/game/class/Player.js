class Player {
    jumpInProgress = false
    JUMP_SPEED = 400
    GRAVITY = -1600
    speed = this.JUMP_SPEED


    constructor(ctx, height, scaleRatio, colors, playerColor) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.height = height
        this.width = this.height
        this.scaleRatio = scaleRatio
        this.colors = colors
        this.playerColor = playerColor

        this.x = (this.canvas.width / 2) - (this.width / 2 * scaleRatio)
        this.y = this.canvas.height - 75 * scaleRatio

        this.image = new Image()
        this.image.src = `../../../imgs/player/p0-${this.playerColor}.svg`

        /* LISTENERS */
        window.removeEventListener('click', () => this.checkJump())
        window.addEventListener('click', () => this.checkJump())
     
    }

    update(frameDelta, background, obsController) {
        /////////////////////////////////////////
        //// GLOBAL VARIABLE USAGE (WARNING) ////
        playerColorMemory = this.playerColor
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
            if ((this.y + this.height) >= this.canvas.height) {
                this.y = this.canvas.height - this.height
            }
        }
    }

    draw() {
        // this.ctx.filter = `drow-shadow(0 0 0 ${this.playerColor})`
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)

    }

    getPlayerColor() {
        return this.colors[this.playerColor - 1]
    }

    getRandomNumber(min, max) {
        // Obtiene un numero random entre el minimo y el maximo
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}