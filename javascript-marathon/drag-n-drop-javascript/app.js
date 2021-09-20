const run = () => {
    const item = document.querySelector('.item')

    const dragStart = (event) => {
        event.target.classList.add('hold')
        window.setTimeout(() =>
                event.target.classList.add('hide'),
            0
        )
    }

    const dragEnd = (event) => {
        event.target.classList.remove('hold', 'hide')
    }

    const placeholders = document.querySelectorAll('.placeholder')

    const dragOver = (event) => {
        event.preventDefault()
    }

    const dragEnter = (event) => {
        event.target.classList.add('hovered')
    }

    const dragLeave = (event) => {
        event.target.classList.remove('hovered')
    }

    const dragDrop = (event) => {
        event.target.append(item)
        event.target.classList.remove('hovered')
    }

    for (const placeholder of placeholders) {
        placeholder.addEventListener('dragover', dragOver)
        placeholder.addEventListener('dragenter', dragEnter)
        placeholder.addEventListener('dragleave', dragLeave)
        placeholder.addEventListener('drop', dragDrop)
    }


    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
}

document.addEventListener('DOMContentLoaded', run)
