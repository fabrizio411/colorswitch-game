class ObsController {
    OBSTACLE_INTERVAL = 100
    MAX_OBSTALCES = 6

    obstacles = []

    constructor(ctx, obsArray, scaleRatio, colors) {
        this.ctx = ctx
        this.canvas = ctx.canvas
        this.obsArray = obsArray
        this.scaleRatio = scaleRatio
        this.colors = colors
        
    }

    update(frameDelta) {
        // Hace el update de cada obstaculo (rotacion)
        this.obstacles.forEach(obs => obs.update(frameDelta));
    }

    move(dy) {
        // Handler del movimiento d los obstaculos con el fondo
        this.obstacles.forEach(obs => obs.move(dy))
    }

    createObstacle() {
        // Generar obstaculos y guardarlos en this.obstacles
        if (this.obstacles.length < this.MAX_OBSTALCES) {
            const index = this.getRandomNumber(0, this.obsArray.length - 1)
            // Se selecciona un obstaculo aleatorio
            let obsInfo
            /////////////////////////////////////////
            //// GLOBAL VARIABLE USAGE (WARNING)
            console.log(obstaclesMemory)
            if (obstaclesMemory.length === this.MAX_OBSTALCES) {
                obsInfo = this.obsArray[obstaclesMemory[this.obstacles.length]]
                console.log(this.obsArray[obstaclesMemory[this.obstacles.length]])
            } else {
                obsInfo = this.obsArray[index] // TODO 1: (cuidado con rezise de pantalla)
                obstaclesMemory.push(index)
            }
            /////////////////////////////////////////
            /////////////////////////////////////////
            const x = this.canvas.width / 2
            const height = obsInfo.radius * 2 + obsInfo.lineWidth + this.OBSTACLE_INTERVAL * this.scaleRatio

            let y = this.canvas.height / 2 - 50 * this.scaleRatio
            let dy = 0
            for (let i = 0; i < this.obstacles.length; i++) {
                dy += this.obstacles[i].height
            }
            y -= dy + obsInfo.radius

            const obstacle = new Obstacle(
                this.ctx, 
                x, 
                y, 
                height,
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
        this.createObstacle()
        this.obstacles.forEach(obs => obs.draw());
    }

    getRandomNumber(min, max) {
        // Obtiene un numero random entre el minimo y el maximo
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}

class Obstacle {
    currentAngle = 0

    constructor(ctx, x, y, height, radius, lineWidth, rotationSpeed, scaleRatio, colors) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.height = height
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