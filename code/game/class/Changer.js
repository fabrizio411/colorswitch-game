class ColorChanger {
    isAlive = true

    constructor(ctx, x, y, colors, scaleRatio) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.colors = colors
        this.radius = 8 * scaleRatio
    }

    update(player) {
        this.handleColition(player)
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

    handleColition(player) {
        if (this.checkColition(player) && this.isAlive) {
            this.isAlive = false
            player.changeColor()
        }
    }

    move(dy) {
        this.y += dy
    }

    draw() {
        if (this.isAlive) {
            for (let i = 1; i <= 4; i++) {
                let arcStart = null
                let arcEnd = null
        
                if (i === 1) {
                    arcStart = 0
                    arcEnd = Math.PI / 2
                } else if (i === 2) {
                    arcStart = Math.PI / 2
                    arcEnd = Math.PI
                } else if (i === 3) {
                    arcStart = Math.PI
                    arcEnd = (Math.PI * 3) / 2
                } else if (i === 4) {
                    arcStart = (Math.PI * 3) / 2
                    arcEnd = Math.PI * 2
                }
    
                this.ctx.beginPath()
                this.ctx.strokeStyle = this.colors[i - 1]
                this.ctx.lineWidth = this.radius * 2
                this.ctx.arc(
                    this.x, 
                    this.y, 
                    this.radius, 
                    arcStart,
                    arcEnd,
                    false
                )
                this.ctx.stroke()
                this.ctx.closePath()
            }
        }
    }
}