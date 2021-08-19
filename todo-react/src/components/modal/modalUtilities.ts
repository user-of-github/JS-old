import {ModalState} from '../../types/ModalState'

export const buttonClosePressed = (modalState: ModalState): void => {
    modalState.visible = false
}


export const duration = 300;

export const defaultStyle = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(.89,-0.42,.37,1.82)',
    transitionProperty: 'transform, opacity',
    transform: 'translateY(-100%)',
    opacity: 0,
}

export const transitionStyles = {
    entering: {opacity: 1, transform: 'translateY(0)'},
    entered: {opacity: 1, transform: 'translateY(0)'},
    exiting: {opacity: 0, transform: 'translateY(-100%)'},
    exited: {opacity: 0, transform: 'translateY(-100%)'},
}