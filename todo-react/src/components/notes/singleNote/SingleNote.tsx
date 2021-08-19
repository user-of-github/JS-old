import {Note} from '../../../types/Note'
import Style from './SingleNote.module.css'
import {buttonDeleteNotePressed, toggleCheckboxClicked} from './singleNoteUtilities'
import {AppState} from '../../../types/AppState'
import {observer} from 'mobx-react'


export const SingleNote = observer((props: { note: Note, mainState: AppState }): JSX.Element => (
    <li className={Style.container}>
        <div className={Style.inputGroup}>
            <input type="checkbox"
                   checked={props.note.done}
                   onChange={() => toggleCheckboxClicked(props.note.id, props.mainState)}
                   id={props.note.id}/>
            <label htmlFor={props.note.id}/>
        </div>
        <span className={`${Style.text} ${props.note.done ? Style.done : ''}`} title={props.note.text}>{props.note.text}</span>
        <span className={Style.date}>{props.note.date.toString().slice(0, 10)}</span>
        <button className={Style.delete}
                onClick={() => buttonDeleteNotePressed(props.note.id, props.mainState)}>
            &times;
        </button>
    </li>
))