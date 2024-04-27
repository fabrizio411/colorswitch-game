class ObsController {
    OBSTACLE_INTERVAL = 100

    obstacles = []

    constructor(ctx, obsArray, scaleRatio, colors) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.obsArray = obsArray
        this.scaleRatio = scaleRatio
        this.colors = colors
    }

    update(frameDelta) {
        // Hace el update de cada obstaculo
        this.obstacles.forEach(obs => obs.update(frameDelta));
        // TODO 1: hacer que el ciruclo se mueva con el backgrounds
    }

    move(dy) {
        // Handler del movimiento d los obstaculos con el fondo
        this.obstacles.forEach(obs => obs.move(dy))
        // if (dy > 0) {
        //     return true
        // } else {
        //     return false
        // }
    }

    createObstacle(y) {
        // Generar obstaculos y guardarlos en this.obstacles
        if (this.obstacles.length < 1) {
            const index = this.getRandomNumber(0, this.obsArray.length - 1)
            // Se selecciona un obstaculo aleatorio
            const obsInfo = this.obsArray[0] // TODO 3: Hacer aleatorio (cuidado con rezise de pantalla)
            const x = this.canvas.width / 2
            const obstacle = new Obstacle(
                this.ctx, 
                x, 
                y * this.scaleRatio, 
                obsInfo.radius, 
                obsInfo.lineWidth, 
                obsInfo.rotationSpeed, 
                this.scaleRatio, 
                this.colors
            )

            this.obstacles.push(obstacle)
        }
    }

    draw() {
        let firstY = this.canvas.height / 2 - 50
        // let prevRadius = 0
        // this.obstacles.forEach(obs => {
        //     firstY -= this.OBSTACLE_INTERVAL + prevRadius + obs.radius
        //     prevRadius = obs.radius
        // })
        this.createObstacle(firstY)
        this.obstacles.forEach(obs => obs.draw());
    }

    getRandomNumber(min, max) {
        // Obtiene un numero random entre el minimo y el maximo
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

class Obstacle {
    currentAngle = 0

    constructor(ctx, x, y, radius, lineWidth, rotationSpeed, scaleRatio, colors) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.radius = radius
        this.lineWidth = lineWidth
        this.rotationSpeed = rotationSpeed
        this.scaleRatio = scaleRatio
        this.colors = colors
    }

    update(frameDelta) {
        // Update del angulo en que se dibuja el obstaculo
        this.currentAngle += this.rotationSpeed * frameDelta
        if (this.currentAngle >= Math.PI * 2) {
            this.currentAngle = 0
        }
    }

    move(dy) {
        // Update del movimiento del obstaculo con el fondo
        this.y += dy
    }

    draw() {
        // Dibujar 4 cuartos de circulo de cada color para formar el obstaculo
        for (let i = 1; i <= 4; i++) {
            let arcStart
            let arcEnd
    
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
            this.ctx.lineWidth = this.lineWidth
            this.ctx.arc(
                this.x, 
                this.y, 
                this.radius, 
                arcStart + this.currentAngle,
                arcEnd + this.currentAngle,
                false
            )
            this.ctx.stroke()
            this.ctx.closePath()
        }
    }
}