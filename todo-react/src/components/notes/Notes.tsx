import {Note} from '../../types/Note'
import Style from './Notes.module.css'
import {SingleNote} from './singleNote/SingleNote'
import {observer} from 'mobx-react'
import {AppState} from '../../types/AppState'
import {CSSTransition, TransitionGroup,} from 'react-transition-group'
import './animations.css'

export const Notes = observer((props: { notes: Map<string, Note>, mainState: AppState }): JSX.Element => (
    <div className={Style.container}>
        <ul className={Style.notesList}>
            {
                props.notes.size
                    ?
                    <TransitionGroup component={null}>
                        {
                            props.mainState.filterNotes().map((pair: [string, Note]) =>
                                <CSSTransition
                                    key={pair[1].id}
                                    timeout={500}
                                    classNames="item"
                                >
                                    <SingleNote key={pair[1].id} mainState={props.mainState} note={pair[1]}/>
                                </CSSTransition>
                            )
                        }
                    </TransitionGroup>
                    :
                    <span className={Style.emptyList}>Empty list</span>
            }
        </ul>
    </div>
))
