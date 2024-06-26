class ObsPiece {
    constructor(xPos, yPos, pieceNumber, radius, currentAngle, width) {
        this.xPos = xPos
        this.yPos = yPos
        this.pieceNumber = pieceNumber
        this.radius = radius
        this.currentAngle = currentAngle
        this.width = width
    }

    draw(context) {
        let arcStart
        let arcEnd

        if (this.pieceNumber === 1) {
            arcStart = 0
            arcEnd = Math.PI / 2
        } else if (this.pieceNumber === 2) {
            arcStart = Math.PI / 2
            arcEnd = Math.PI
        } else if (this.pieceNumber === 3) {
            arcStart = Math.PI
            arcEnd = (Math.PI * 3) / 2
        } else if (this.pieceNumber === 4) {
            arcStart = (Math.PI * 3) / 2
            arcEnd = Math.PI * 2
        }

        context.beginPath()
        context.strokeStyle = colors[this.pieceNumber - 1]
        context.lineWidth = this.width
        context.arc(this.xPos, this.yPos, this.radius, arcStart + this.currentAngle, arcEnd + this.currentAngle, false)
        context.stroke()
        context.closePath()
    }
}

class Obstacle {
    constructor(xPos, yPos, radius, rotationSpeed, width) {
        this.xPos = xPos
        this.yPos = yPos
        this.radius = radius
        this.rotationSpeed = rotationSpeed
        this.currentAngle = 0
        this.width = width
        this.piece1 = undefined
        this.piece2 = undefined
        this.piece3 = undefined
        this.piece4 = undefined
    }

    draw(context) {
        this.piece1 = new ObsPiece(this.xPos, this.yPos, 1, this.radius, this.currentAngle, this.width) 
        this.piece2 = new ObsPiece(this.xPos, this.yPos, 2, this.radius, this.currentAngle, this.width) 
        this.piece3 = new ObsPiece(this.xPos, this.yPos, 3, this.radius, this.currentAngle, this.width) 
        this.piece4 = new ObsPiece(this.xPos, this.yPos, 4, this.radius, this.currentAngle, this.width) 

        this.piece1.draw(context)
        this.piece2.draw(context)
        this.piece3.draw(context)
        this.piece4.draw(context)
    }
}