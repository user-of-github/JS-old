import {makeAutoObservable} from 'mobx'
import {Note} from './Note'
import {ModalState} from './ModalState'
import {CurrentMode} from './CurrentMode'
import {Notes} from "../components/notes/Notes";

const LOCAL_STORAGE_CELL_NAME: string = 'noteAppLocalStorageName'
const RANDOM_CONSTANT: number = 2112

const RANDOM_CONGRATS: Array<string> = ['Congratulations !', 'Great !', 'Hooray !', 'Cool !', 'Good job !',
    'Well done !']

export class AppState {
    private input: HTMLInputElement | null
    public allNotes: Map<string, Note>
    private timerID: number | null
    public modal: ModalState
    private static readonly modalTimer: number = 2000
    public mode: CurrentMode

    public constructor() {
        this.allNotes = this.getFromLocalStorage()
        this.input = null
        this.modal = {title: '', text: '', visible: false}
        this.mode = CurrentMode.ALL
        makeAutoObservable(this, {}, {deep: true})
        this.timerID = null
    }

    public addNote(): void {
        const text: string = this.input!.value.trim()

        if (text === '') {
            return
        }

        const now: Date = new Date()
        let id: string = AppState.generateId()
        while (this.allNotes.has(id))
            id = AppState.generateId()

        this.allNotes.set(id, {
            text: text,
            done: false,
            id: id,
            date: now
        })
        this.clearInput()
        this.saveToLocalStorage()
        this.makeSuccessAddedModal()
        this.showModal()
    }

    public deleteNote(id: string): void {
        if (this.allNotes.has(id)) {
            this.allNotes.delete(id)
            this.saveToLocalStorage()
            this.makeDeletedTaskModal()
            this.showModal()
        }

    }

    private static generateId(): string {
        return (Date.now().toString(32) + (Math.random() * RANDOM_CONSTANT).toString())
    }

    public toggleNote(id: string): void {
        if (this.allNotes.has(id)) {
            this.allNotes.get(id)!.done = !this.allNotes.get(id)!.done
            this.saveToLocalStorage()

            if (this.allNotes.get(id)!.done) {
                this.makeCongratsDoneTaskModal()
                this.showModal()
            }
        }
    }

    public setMainInput(input: HTMLInputElement): void {
        this.input = input
    }

    private clearInput(): void {
        this.clearInputRecursive()
    }

    private clearInputRecursive(): void {
        this.timerID = window.setTimeout(() => {
            if (this.input!.value === '') {
                window.clearTimeout(this.timerID!)
                return
            }
            this.input!.value = this.input!.value.slice(0, -1)
            this.clearInput()
        }, 10)
    }

    private saveToLocalStorage(): void {
        localStorage.setItem(LOCAL_STORAGE_CELL_NAME, JSON.stringify(Array.from(this.allNotes)))
    }

    private getFromLocalStorage(): Map<string, Note> {
        const savedString: string = localStorage.getItem(LOCAL_STORAGE_CELL_NAME) || ''
        const response: Map<string, Note> = new Map<string, Note>()
        if (savedString === '')
            return response

        Array.from(JSON.parse(savedString)).forEach((record: any) => {
            response.set(record[0], record[1])
        })
        return response
    }

    private makeSuccessAddedModal(): void {
        this.modal.title = 'Successfully added'
        this.modal.text = `A new task saved to your note list`
    }

    private showModal(): void {
        this.modal.visible = false
        this.modal.visible = true
        window.setTimeout(() => this.modal.visible = false, AppState.modalTimer)
    }

    private makeCongratsDoneTaskModal(): void {
        this.modal.title = RANDOM_CONGRATS[Math.floor(Math.random() * RANDOM_CONGRATS.length)]
        this.modal.text = 'Proceed to the next task or take a rest'
    }

    private makeDeletedTaskModal(): void {
        this.modal.title = 'Task deleted'
        this.modal.text = 'The note has been removed from your list'
    }

    public filterNotes(): Array<[string, Note]> {
        switch (this.mode) {
            case CurrentMode.ALL:
                return Array.from(this.allNotes)
            case CurrentMode.DONE:
                return Array.from(this.allNotes).filter(value => value[1].done)
            case CurrentMode.UNCOMPLETED:
                return Array.from(this.allNotes).filter(value => !value[1].done)
        }
    }
}