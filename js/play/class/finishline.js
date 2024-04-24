class Finishline {
    constructor(xPos, yPos, totalWidth) {
        this.xPos = xPos
        this.yPos = yPos
        this.totalWidth = totalWidth
    }

    draw(context) {
        let white = '#fff'
        let black = '#000'
        let color
        let count = 0
        
        let squareWidth = this.totalWidth / 32
        
        let rows = 3
        let cols = this.totalWidth / squareWidth
        for (let y = this.yPos; y < rows * squareWidth + this.yPos; y += squareWidth) {
            for (let x = 0; x < cols * squareWidth; x += squareWidth) {
                if (count % 2 === 0) {
                    color = white
                } else color = black
                context.fillStyle = color
                context.fillRect(x, y, squareWidth, squareWidth)
                count++
            }
            count++
        }
    }
}