const DATA = [
    {
        backgroundSlider: `https://images.immediate.co.uk/production/volatile/sites/3/2020/03/infinity-war-122ce1b.jpg`,
        backgroundText: 'linear-gradient(185deg, rgba(1,9,30,1) 0%, rgba(241,98,37,1) 100%)',
        title: 'Avengers&nbsp;3',
        subtitle: 'One of the most box office movies ever'
    },
    {
        backgroundSlider: `https://i.pinimg.com/originals/73/c4/d9/73c4d994f76280fd18847b35b62f2439.jpg`,
        backgroundText: 'linear-gradient(16deg, rgba(3,19,52,1) 0%, rgba(218,26,6,1) 100%)',
        title: 'MARVEL Heroes',
        subtitle: 'Characters known by the whole world'
    },
    {
        backgroundSlider: `https://static.parade.com/wp-content/uploads/2020/03/avengers-marvel.jpg`,
        backgroundText: 'linear-gradient(90deg, rgba(249,39,48,1) 0%, rgba(77,40,180,1) 100%)',
        title: 'Avengers&nbsp;4',
        subtitle: 'The most box office movie by MARVEL ever'
    },
    {
        backgroundSlider: `https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_.jpg`,
        backgroundText: 'linear-gradient(90deg, rgba(228,11,20,1) 0%, rgba(115,131,142,1) 100%)',
        title: 'Captain America: Civil&nbsp;war',
        subtitle: 'The breakup of the avengers'
    },
    {
        backgroundSlider: `https://simondillonbooks.files.wordpress.com/2019/07/spider-man-far-from-home-og-size-image.jpg`,
        backgroundText: 'linear-gradient(90deg, rgba(247,238,209,1) 0%, rgba(196,18,27,1) 100%)',
        title: 'Spider-Man 2: No&nbsp;Way&nbsp;Home',
        subtitle: 'Movie of 2019 by MARVEL'
    }
]


const FillContainersWithData = (sideBar, mainSlide) => {
    const sideBarTemplate = ({backgroundText, title, subtitle}) =>
        `<div style="background: ${backgroundText};">
        <h2>${title}</h2>
        <span>${subtitle}</span>
    </div>`

    const mainSlideTemplate = ({backgroundSlider}) =>
        `<div style="background-image: url('${backgroundSlider}');"></div>`

    DATA.map(item => {
        return {backgroundSlider: item.backgroundSlider}
    }).reverse().forEach(item => mainSlide.insertAdjacentHTML('beforeend', mainSlideTemplate(item)))

    DATA.map(item => {
        return {backgroundText: item.backgroundText, title: item.title, subtitle: item.subtitle}
    }).forEach(item => sideBar.insertAdjacentHTML('beforeend', sideBarTemplate(item)))
}

const changeSlide = (direction, currentState, sideBar, mainSlide) => {
    if (direction === 'up') {
        currentState.activeSlideIndex =
            currentState.activeSlideIndex === currentState.totallySlides - 1
                ? 0
                : currentState.activeSlideIndex + 1
    } else if (direction === 'down') {
        currentState.activeSlideIndex =
            currentState.activeSlideIndex === 0
                ? currentState.totallySlides - 1
                : currentState.activeSlideIndex - 1
    }

    mainSlide.style.transform = `translateY(-${currentState.activeSlideIndex * 100}vh)`
    sideBar.style.transform = `translateY(${currentState.activeSlideIndex * 100}vh)`
}


const runApplication = () => {
    let currentState = {
        activeSlideIndex: 0,
        totallySlides: DATA.length
    }

    const sideBar = document.getElementById('sidebar')
    const mainSlide = document.getElementById('mainslide')
    FillContainersWithData(sideBar, mainSlide)

    const upButton = document.getElementById('up-button')
    const downButton = document.getElementById('down-button')

    sideBar.style.top = `-${(currentState.totallySlides - 1) * 100}vh`

    upButton.addEventListener(
        'click',
        () => changeSlide('up', currentState, sideBar, mainSlide)
    )
    downButton.addEventListener(
        'click',
        () => changeSlide('down', currentState, sideBar, mainSlide)
    )

    document.addEventListener(
        'keydown',
        (event) => {
        if (event.key === 'ArrowUp') {
            changeSlide('up', currentState, sideBar, mainSlide)
        } else if (event.key === 'ArrowDown') {
            changeSlide('down', currentState, sideBar, mainSlide)
        }
    })
}


document.addEventListener('DOMContentLoaded', runApplication)