import {AppState} from '../../types/AppState'


export const ENTER_KEY_CODE: string = 'Enter'

export const addNoteEvent = (event: any, mainState: AppState): void => {
    event.preventDefault()
    mainState.addNote()
}