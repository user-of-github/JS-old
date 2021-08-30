import {ChartState} from './types/ChartState'
import {Point} from './types/Point'
import {getRandomPointsSet} from './utilities/getRandomPointsSet'

const runApplication = (): void => {
    const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
    const mainState: ChartState = new ChartState([
        {x: 0, y: 2}, {x: -5, y: 6},
        {x: -1, y: 2}, {x: -10, y: 7},
        {x: -2, y: 2}, {x: -20, y: 8},
    ], canvas)
    mainState.render()
}


document.addEventListener('DOMContentLoaded', runApplication)