class Ball {
    constructor(domRef) {
        this._ball = domRef
        this._jumpSpeed = 20
        this._gravity = -3
        this._jumpTimeInterval = 0.2
        this._isJumping = false
        this._frameJump = undefined
        this._canJump = true

        document.addEventListener('click', this.jump.bind(this))
    }

    jump() {
        let count = 0
        let done
        let origin = 0

        if (this._isJumping && this._canJump) {
            cancelAnimationFrame(this._frameJump)
            this.handleJump(count, done, origin)
            return
        }
        
        if (this._canJump) {
            this.handleJump(count, done, origin)
        }

    }

    handleJump(count, done, origin) {
        this._isJumping = true

        let ballPos = Number(this._ball.style.bottom.substring(0, this._ball.style.bottom.indexOf('p')))


        if (!done) {
            let g = this._gravity
            let v = this._jumpSpeed + g * (this._jumpTimeInterval * count)

            let prevPos = ballPos
            ballPos += (v * this._jumpTimeInterval) + (0.5 * g * (this._jumpTimeInterval ** 2))

            if (prevPos > ballPos) {
                g = 1
                this._canJump = true
            }

            if (ballPos <= origin) {
                this._ball.style.bottom = `${origin}px`
                done = true
            } else {
                this._ball.style.bottom = `${ballPos}px`
            }

            count++
        }

        this._frameJump = requestAnimationFrame(() => this.handleJump(count, done, origin))
    }
}