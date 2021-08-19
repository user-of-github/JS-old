import {AppState} from '../../../types/AppState'

export const buttonDeleteNotePressed = (id: string, mainState: AppState): void => mainState.deleteNote(id)

export const toggleCheckboxClicked = (id: string, mainState: AppState): void => mainState.toggleNote(id)