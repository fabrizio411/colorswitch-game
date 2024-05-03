class Point {
    color = '#afafaf'
    isAlive = true

    constructor(ctx, x, y, size) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.x = x - size / 2
        this.y = y - size / 2
        this.size = size
    }

    draw() {
        if (this.isAlive) {
            this.ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.size, this.size);
            // Guardar el estado actual del lienzo
            ctx.save();
            // Transladar el origen al centro del cuadrado
            ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
            ctx.rotate(Math.PI / 4);
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            // Restaurar el estado del lienzo
            ctx.restore();
        }
    }

    move(dy) {
        this.y += dy
    }

    update(player, score) {
        this.handleColition(player, score)
    }

    getDistance(playerY) {
        let result = Math.abs(playerY - this.y)
        return result
    }

    checkColition(player) {
        let distance = this.getDistance(player.y)

        if (distance < (player.radius * 2)) {
            return true
        }
    }

    handleColition(player, score) {
        if (this.checkColition(player) && this.isAlive) {
            this.isAlive = false
            score.points += 1
        }
    }
}

class Score {
    points = 0
    font = 'sans-serif'
    color = '#afafaf'

    constructor(ctx, scaleRatio) {
        this.ctx = ctx
        this.x = 15 * scaleRatio
        this.y = 40 * scaleRatio
        this.textSize = 30 * scaleRatio
    }

    draw() {
        this.ctx.font = `${this.textSize}px ${this.font}`
        this.ctx.fillStyle = this.color
        this.ctx.fillText(this.points, this.x, this.y)
    }
}