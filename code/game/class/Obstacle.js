class ObsController {
    OBSTACLE_INTERVAL = 100
    MAX_OBSTALCES = 4

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
        this.obstacles.forEach(obs => obs.update(frameDelta, player));
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
            let obsInfo = null
            /////////////////////////////////////////
            //// GLOBAL VARIABLE USAGE (WARNING) ////
            if (obstaclesMemory.length === this.MAX_OBSTALCES) {
                obsInfo = this.obsArray[obstaclesMemory[this.obstacles.length]]
            } else {
                obsInfo = this.obsArray[index] // TODO 1: (cuidado con rezise de pantalla)
                obstaclesMemory.push(index)
            }
            /////////////////////////////////////////
            /////////////////////////////////////////
            const x = this.canvas.width / 2
            const height = obsInfo.radius * 2 + obsInfo.lineWidth + this.OBSTACLE_INTERVAL * this.scaleRatio

            let y = this.canvas.height / 2
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

        this.handleColition(player)
    }

    move(dy) {
        // Update del movimiento del obstaculo con el fondo
        this.y += dy
    }

    draw() {
        // Dibujar 4 cuartos de circulo de cada color para formar el obstaculo
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

    getDistance(playerY) {
        let result = Math.abs(playerY - this.y)
        return result
    }

    getLapPosition() {
        /* ****
        * Rangos de las piezas
        * < 25
        * 25 - 50
        * 50 - 75
        * > 75
        **** */
        let laps = this.currentAngle / (Math.PI * 2)
        let lapAngle = (laps - Math.floor(laps)) * 100
        return lapAngle
    }

    getColorColition(playerY) {
        let lapPos = this.getLapPosition()
        let clrIndex = null
    
        if (playerY - this.y > 0) {
            // Contacto con parte inferior
            if (lapPos < 25) {
                clrIndex = 0
            } else if (lapPos < 50) {
                clrIndex = 3
            } else if (lapPos < 75) {
                clrIndex = 2
            } else {
                clrIndex = 1
            }
        } else {
            // Contacto con parte superior
            if (lapPos < 25) {
                clrIndex = 2
            } else if (lapPos < 50) {
                clrIndex = 1
            } else if (lapPos < 75) {
                clrIndex = 0
            } else {
                clrIndex = 3
            }
        }
    
        return this.colors[clrIndex]
    }

    checkColition(player) {
        let distance = this.getDistance(player.y)

        if (distance < (player.radius * 2 + this.radius)) {
            return true
        }
    }

    handleColition(player) {
        // Evitando colision dentro del circulo, solo en el borde.
        let distance = this.getDistance(player.y + player.radius)

        let innerSeparation = this.radius - this.lineWidth
        if ((player.y - this.y) < 0) {
            innerSeparation -= player.radius
        } else {
            innerSeparation += player.radius
        }

        if (this.checkColition(player) && distance > innerSeparation) {
            console.log(true)
            // Controlando que color hizo colicion
            if (this.getColorColition(player.y) !== player.color) {
                alert('perdiste')
            }
        }
    }

    // getDistance(playerY) {
    //     let result = playerY - this.y
    //     return result
    // }

    // getLapPosition() {
    //     /* ****
    //     * Rangos de las piezas
    //     * < 25
    //     * 25 - 50
    //     * 50 - 75
    //     * > 75
    //     **** */
    //     let laps = this.currentAngle / (Math.PI * 2)
    //     let lapAngle = (laps - Math.floor(laps)) * 100
    //     return lapAngle
    // }

    // getColorColition(playerY) {
    //     let lapPos = this.getLapPosition()
    //     let clrIndex = null
    
    //     if ((this.getDistance(playerY)) > 0) {
    //         // Contacto con parte inferior
    //         if (lapPos < 25) {
    //             clrIndex = 0
    //         } else if (lapPos < 50) {
    //             clrIndex = 3
    //         } else if (lapPos < 75) {
    //             clrIndex = 2
    //         } else {
    //             clrIndex = 1
    //         }
    //     } else {
    //         // Contacto con parte superior
    //         if (lapPos < 25) {
    //             clrIndex = 2
    //         } else if (lapPos < 50) {
    //             clrIndex = 1
    //         } else if (lapPos < 75) {
    //             clrIndex = 0
    //         } else {
    //             clrIndex = 3
    //         }
    //     }
    
    //     return this.colors[clrIndex]
    // }

    // checkColition(player) {
    //     let distance = this.getDistance(player.y + player.radius - this.lineWidth)

    //     let minSeparation = null
    //     if (distance < 0) {
    //         minSeparation = this.radius - player.height
    //     } else {
    //         minSeparation = this.radius 
    //     }

    //     if (Math.abs(distance) < minSeparation) {
    //         return true
    //     }
    // }

    // handleColition(player) {
    //     // Evitando colision dentro del circulo, solo en el borde.
    //     let distance = this.getDistance(player.y + player.radius)

    //     let innerSeparation = this.radius - this.lineWidth / 2 - player.radius

    //     if (this.checkColition(player) && Math.abs(distance) > innerSeparation) {
    //         console.log(true)
    //         // Controlando que color hizo colicion
    //         if (this.getColorColition(player.y + player.radius) !== player.getPlayerColor()) {
    //             alert('perdiste')
    //         }
    //     }
    // }
}