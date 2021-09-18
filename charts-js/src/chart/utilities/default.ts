import {Parameters} from '../types/Parameters'
import {Theme} from '../types/Theme'


const DEFAULT_PIXEL_RATIO: number = 2

const defaultTheme: Theme = {
    colors: {
        chartLine: '#2ed573',
        gridRowLine: 'rgba(47, 53, 66,0.25)',
        background: '#F8F9FD',
        toolLine: '#34495e'
    },
    font: {
        family: 'Play, sans-serif',
        color: 'rgba(47, 53, 66,0.5)',
        size: 15 * DEFAULT_PIXEL_RATIO,
        style: 'normal'
    }
}

export const defaultParameters: Parameters = {
    pixelRatio: DEFAULT_PIXEL_RATIO,
    theme: defaultTheme,
    rowsCount: 5,
    colsCount: 6,
    sizes: {
        padding: 50 * DEFAULT_PIXEL_RATIO,
        chartLine: 2 * DEFAULT_PIXEL_RATIO,
        gridRowLine: 0.25 * DEFAULT_PIXEL_RATIO,
        circleOnOver: 4 * DEFAULT_PIXEL_RATIO
    }
}