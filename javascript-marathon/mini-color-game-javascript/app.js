const PARAMETERS = {
    squaresNumber: 693,
    defaultColor: '#26323B',
    defaultBoxShadow: '0 0 2px #000',
    colors: [
        '#3c40c6', '#ff3f34', '#05c46b', '#34e7e4',
        '#d2dae2', '#f53b57', '#ffa801',
        '#00d8d6', '#ffdd59'
    ] // https://flatuicolors.com/palette/se
}

const createSquares = (board) => {
    const response = []
    for (let counter = 0; counter < PARAMETERS.squaresNumber; ++counter) {
        const square = document.createElement('div')
        square.classList.add('square')
        board.append(square)
        response.push(square)
    }
    return response
}

const getRandomColor = () => PARAMETERS.colors[Math.floor(Math.random() * PARAMETERS.colors.length)]

const setColor = (square) => {
    const color = getRandomColor()
    square.style.backgroundColor = color
    square.style.boxShadow = `0 0 2px ${color}, 0 0 7px ${color}`
}

const removeColor = (square) => {
    square.style.backgroundColor = PARAMETERS.defaultColor
    square.style.boxShadow = PARAMETERS.defaultBoxShadow
}

const setUpSquares = (squares) => {
    squares.forEach(square => {
        square.addEventListener(
            'mouseover',
            () => setColor(square)
        )

        square.addEventListener(
            'mouseleave',
            () => removeColor(square)
        )
    })
}

const runApplication = () => {
    const board = document.getElementById('board')
    const squares = createSquares(board)
    setUpSquares(squares)
}


document.addEventListener('DOMContentLoaded', runApplication)