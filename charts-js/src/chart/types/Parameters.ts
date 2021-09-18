import {Theme} from './Theme'

interface Dimensions {
    padding: number
    chartLine: number
    gridRowLine: number
    circleOnOver: number
}

export interface Parameters {
    pixelRatio: number
    theme: Theme
    rowsCount: number // for Y
    colsCount: number // for X
    sizes: Dimensions
}