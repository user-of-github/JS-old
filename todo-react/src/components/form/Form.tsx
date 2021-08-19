import Style from './Form.module.css'
import {AppState} from '../../types/AppState'
import React from 'react'
import {addNoteEvent, ENTER_KEY_CODE} from './formUtilities'


export const Form = (props: { mainState: AppState }): JSX.Element => {
    const inputRef: React.MutableRefObject<HTMLInputElement | null> = React.useRef<HTMLInputElement | null>(null)

    React.useLayoutEffect(() => inputRef && props.mainState.setMainInput(inputRef.current!))

    return (
        <form className={Style.form}>
            <div className={Style.row}>
                <input className={Style.input}
                       type="text"
                       placeholder="Enter note text"
                       onKeyPress={event => event.key === ENTER_KEY_CODE && addNoteEvent(event, props.mainState)}
                       ref={inputRef}
                       maxLength={100}
                />
                <button className={Style.add}
                        onClick={event => addNoteEvent(event, props.mainState)}>
                    Add
                </button>
            </div>
        </form>
    )
}
