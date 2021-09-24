const runApplication = () => {
    const gradients = [
        `linear-gradient(259deg, rgba(17,157,0,1) 0%, rgba(255,174,0,1) 100%)`,
        `radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)`,
        `radial-gradient(circle, rgba(252,70,107,1) 0%, rgba(63,94,251,1) 100%)`,
        `radial-gradient(circle, rgba(253,29,29,1) 0%, rgba(131,58,180,1) 48%, rgba(252,176,69,1) 100%)`
    ]
    const startButton = document.getElementById('start')
    const screens = document.getElementsByClassName('screen')
    const timeList = document.getElementById('time-list')
    const timeSpan = document.getElementById('time')
    const board = document.getElementById('board')
    const {width, height} = board.getBoundingClientRect()
    let time = 0
    let score = 0

    startButton.addEventListener(
        'click',
        () => window.setTimeout(() => screens[0].classList.add('up'), 200)
    )

    timeList.addEventListener(
        'click',
        (event) => {
            if (event.target.classList.contains('time-btn')) {
                time = Number.parseInt(event.target.getAttribute('data-time'))
                window.setTimeout(
                    () => startGame(time, timeSpan),
                    200
                )
            }
        }
    )

    board.addEventListener(
        'click',
        (event) => {
            if (event.target.classList.contains('circle')) {
                ++score
                event.target.remove()
                createRandomCircle()
            }
        }
    )

    function finishGame() {
        timeSpan.parentElement.classList.add('hide')
        board.innerHTML = `<h2 class="score">Score: ${score}</h2>`
    }

    const setTime = (timeToSet) => timeSpan.textContent = `00:${timeToSet}`
    const getRandomNumber = (from, to) => Math.round(Math.random() * (to - from) + from)

    function startGame() {
        screens[1].classList.add('up')

        setTime(time)

        const intervalId = window.setInterval(decreaseTime, 1000)
        createRandomCircle()

        function decreaseTime() {
            let current = (time - 1 < 10) ? `0${time - 1}` : `${time - 1}`
            time -= 1
            setTime(current)
            if (time === 0) {
                window.clearInterval(intervalId)
                finishGame()
            }
        }
    }

    function createRandomCircle() {
        const circle = document.createElement('div')
        circle.classList.add('circle')
        const size = getRandomNumber(20, 45)
        circle.style.width = circle.style.height = `${size}px`
        circle.style.top = `${getRandomNumber(0, height - size)}px`
        circle.style.left = `${getRandomNumber(0, width - size)}px`
        circle.style.background = gradients[Math.floor(Math.random() * gradients.length)]
        board.append(circle)
    }
}


document.addEventListener('DOMContentLoaded', runApplication)