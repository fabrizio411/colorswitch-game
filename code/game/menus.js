function displayGameOverMenu() {
    document.querySelector('#end-menu').style.display = 'flex'
    document.querySelector('#restart-btn').addEventListener('click', reset, { once: true })

    document.querySelector('#runScore').innerHTML = runScore
    document.querySelector('#bestScore').innerHTML = bestScore
    document.querySelector('#totalPoints').innerHTML = totalPoints
}