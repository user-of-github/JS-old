import {Form} from '../../form/Form'
import {Notes} from '../../notes/Notes'
import {AppState} from '../../../types/AppState'
import React from 'react'
import Style from './Home.module.css'
import {Modal} from '../../modal/Modal'
import {Mode} from "../../mode/Mode";

export const Home = (): JSX.Element => {
    const main: React.MutableRefObject<AppState> = React.useRef(new AppState())
    return (
        <div className={Style.container}>
            <Form mainState={main.current}/>
            <Mode mainState={main.current}/>
            <Notes mainState={main.current}
                   notes={main.current.allNotes}/>
            <Modal modalState={main.current.modal}/>
        </div>
    )
}