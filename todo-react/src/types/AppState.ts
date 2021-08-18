import {makeAutoObservable} from 'mobx'
import {Note} from './Note'

const LOCAL_STORAGE_CELL_NAME: string = 'noteAppLocalStorageName'
const RANDOM_CONSTANT: number = 2112


export class AppState {
    private input: HTMLInputElement | null
    public notes: Map<string, Note>
    private timerID: number | null

    public constructor() {
        this.notes = new Map<string, Note>()
        this.input = null
        makeAutoObservable(this, {}, {deep: true})
        this.timerID = null
    }

    public addNote(): void {
        const text: string = this.input!.value.trim()
        this.clearInput()
        if (text === '')
            return
        const now: Date = new Date()
        let id: string = AppState.generateId()
        while (this.notes.has(id))
            id = AppState.generateId()

        this.notes.set(id, {
            text: text,
            done: false,
            id: id,
            date: now
        })
    }

    public deleteNote(id: string): void {
        this.notes.has(id) && this.notes.delete(id)
    }

    private static generateId(): string {
        return (Date.now().toString(32) + (Math.random() * RANDOM_CONSTANT).toString())
    }

    public toggleNote(id: string): void {
        if (this.notes.has(id))
            this.notes.get(id)!.done = !this.notes.get(id)!.done
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
}