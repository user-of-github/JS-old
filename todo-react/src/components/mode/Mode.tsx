import {observer} from 'mobx-react'
import {AppState} from '../../types/AppState'
import Style from './Mode.module.css'
import {CurrentMode} from "../../types/CurrentMode";


export const Mode = observer((props: {mainState: AppState}): JSX.Element => (
    <div className={Style.container}>
        <div className={Style.row}>
            <button className={`${Style.button} ${props.mainState.mode === CurrentMode.ALL ? Style.chosen : ''}`}
                    onClick={() => props.mainState.mode = CurrentMode.ALL}>All</button>
            <button className={`${Style.button} ${props.mainState.mode === CurrentMode.DONE ? Style.chosen : ''}`}
                    onClick={() => props.mainState.mode = CurrentMode.DONE}>Done</button>
            <button className={`${Style.button} ${props.mainState.mode === CurrentMode.UNCOMPLETED ? Style.chosen : ''}`}
                    onClick={() => props.mainState.mode = CurrentMode.UNCOMPLETED}>Uncompleted</button>
        </div>
    </div>
))