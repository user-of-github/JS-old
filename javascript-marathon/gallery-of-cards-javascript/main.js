const DATA = [
    {
        link: `https://www.cnet.com/a/img/nLXD_eUqNw5sXRcq1pnah2iV-k0=/940x0/2019/03/14/dd4d8d9c-5f16-4f6b-a7d8-65a00d095c2c/avengers-endgame-poster-square-crop.jpg`,
        title: 'Avengers 4'
    },
    {
        link: `https://www.denofgeek.com/wp-content/uploads/2019/04/infinity-war-montage-main.jpg?fit=1920%2C1080`,
        title: 'Avengers 3'
    },
    {
        link: `https://variety.com/wp-content/uploads/2021/08/Spider-Man.jpg`,
        title: 'Spider-Man 3'
    },
    {
        link: `https://cdn.mos.cms.futurecdn.net/gjs3TPZu24HvS9m3W3PCna.jpg`,
        title: 'Venom 2'
    },
    {
        link: `https://cdn.vox-cdn.com/thumbor/LIdWwvADFJqHrLBye_2cmBXKu68=/0x0:3840x2160/1200x800/filters:focal(1519x364:2133x978)/cdn.vox-cdn.com/uploads/chorus_image/image/68667868/wvk7040_trl_comp_v003_uhd_r709_d85abcd9.0.jpeg`,
        title: 'WandaVision'
    },
    {
        link: `https://www.letsott.com/assets/uploads/posts/loki-disney-plus1.jpg`,
        title: 'Loki'
    }
]

const slideHTMLElement = ({link, title}) => {
    return `<div class="slide" style="background-image: url('${link}');"><h3>${title}</h3></div>`
}

const FillSlider = (container) => {
    DATA.forEach(item => {
        container.insertAdjacentHTML('beforeend', slideHTMLElement(item))
    })
}

let currentlyActiveSlide = null

const run = () => {
    DATA.sort(() => Math.random() - 0.5)
    const sliderContainer = document.getElementById('slider')
    FillSlider(sliderContainer)
    const slides = document.getElementsByClassName('slide')
    for (const slide of slides) {
        slide.addEventListener('click', () => {
            currentlyActiveSlide?.classList.remove('active')
            slide.classList.add('active')
            currentlyActiveSlide = slide
        })
    }
}

document.addEventListener('DOMContentLoaded', run)