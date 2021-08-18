import {Note} from '../../../types/Note'
import Style from './SingleNote.module.css'
import {buttonDeleteNotePressed} from './singleNoteUtilities'
import {AppState} from '../../../types/AppState'
import {observer} from 'mobx-react'


export const SingleNote = observer((props: { note: Note, mainState: AppState }): JSX.Element => (
    <li className={Style.container}>
        <input type="checkbox" checked={props.note.done}/>
        <span className={Style.text}>{props.note.text}</span>
        <button className={Style.delete}
                onClick={() => buttonDeleteNotePressed(props.note.id, props.mainState)}>
            &times;
        </button>
    </li>
))