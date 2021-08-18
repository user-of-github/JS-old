import {Note} from '../../types/Note'
import Style from './Notes.module.css'
import {SingleNote} from "./singleNote/SingleNote";

export const Notes = (props: { notes: Array<Note> }) => {

    return (
        <div className={Style.container}>
            <ul className={Style.notesList}>
                {
                    props.notes.length
                        ?
                        props.notes.map((note: Note) => <SingleNote note={note}/>)
                        :
                        'Empty list'
                }
            </ul>
        </div>
    )
}