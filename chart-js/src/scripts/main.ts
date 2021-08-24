import {ChartState} from './types/ChartState'
import {Point} from './types/Point'

const runApplication = (): void => {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
    const testPoints1: Array<Point> = [{x: 0, y: -1}, {x: 30, y: -0}, {x: 0, y: 2}, {x: -6, y: 0}]
    const testPoints2: Array<Point> = [{x: 1, y: 2}, {x: 1, y: 2}, {x: 1, y: 2}, {x: 1, y: 2}]
    const testPoints3: Array<Point> = [{x: -1, y: 2}, {x: -1, y: 2}, {x: -1, y: 2}, {x: -1, y: 2}]
    const mainState: ChartState = new ChartState(testPoints1, canvas)
    mainState.render()
}


document.addEventListener('DOMContentLoaded', runApplication)