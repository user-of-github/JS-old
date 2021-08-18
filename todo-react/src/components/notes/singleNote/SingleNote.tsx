import {Note} from '../../../types/Note'
import Style from './SingleNote.module.css'

export const SingleNote = (props: {note: Note}):JSX.Element => (
    <li className={Style.container}>
        <input type="checkbox" checked={props.note.done}/>
        <span className={Style.text}>{props.note.text}</span>
        <button className={Style.delete}>&times;</button>
    </li>
)