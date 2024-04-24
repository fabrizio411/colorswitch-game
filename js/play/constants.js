// Red - Cian - Yellow - Violet
const colors = ['#fc0083','#35e2eb','#f4eb43','#7233cf']

// Obtener numero random (max no inclisive)
const randomNumber = (min, max) => {
    let result = Math.floor(Math.random() * (max - min) + min)
    return result
}