import {Form} from '../form/Form'
import {Notes} from '../notes/Notes'
import {AppState} from '../../types/AppState'
import React from 'react'


export const Home = (): JSX.Element => {
    const main: React.MutableRefObject<AppState> = React.useRef(new AppState())

    return (
        <>
            <Form mainState={main.current}/>
            <Notes mainState={main.current} notes={main.current.notes}/>
        </>
    )
}