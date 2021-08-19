import {observer} from 'mobx-react'
import {CSSTransition, Transition} from 'react-transition-group'
import {ModalState} from '../../types/ModalState'
import Style from './Modal.module.css'
import {buttonClosePressed, defaultStyle, transitionStyles} from './modalUtilities'



export const Modal = observer((props: {modalState: ModalState}): JSX.Element => (
                <Transition in={props.modalState.visible} timeout={300}>
                    {
                        state => (
                            <div className={Style.container} style={{
                                ...defaultStyle, // @ts-ignore
                                ...transitionStyles[state]}}>
                                <div className={Style.header}>
                                    <h3 className={Style.title}>{props.modalState.title}</h3>
                                    <button className={Style.close}
                                            onClick={() => buttonClosePressed(props.modalState)}>&times;</button>
                                </div>
                                <div className={Style.body}>
                                    <span className={Style.text}>{props.modalState.text}</span>
                                </div>
                            </div>
                        )
                    }
                </Transition>
))