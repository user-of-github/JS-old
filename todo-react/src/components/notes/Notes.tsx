import {Note} from '../../types/Note'
import Style from './Notes.module.css'
import {SingleNote} from './singleNote/SingleNote'
import {observer} from 'mobx-react'
import {AppState} from '../../types/AppState'

export const Notes = observer((props: { notes: Map<string, Note>, mainState: AppState }): JSX.Element => (
    <div className={Style.container}>
        <ul className={Style.notesList}>
            {
                props.notes.size
                    ?
                    Array.from(props.notes).map((pair: [string, Note]) =>
                        <SingleNote key={pair[1].id} mainState={props.mainState} note={pair[1]}/>)
                    :
                    <span>Empty list</span>
            }
        </ul>
    </div>
))
