import {Parameters} from '../types/Parameters'
import {Theme} from '../types/Theme'


const DEFAULT_PIXEL_RATIO: number = 3

const defaultTheme: Theme = {
    sizes: {
        chartLine: DEFAULT_PIXEL_RATIO * 4,
        gridRowLine: 0.25 * DEFAULT_PIXEL_RATIO
    },
    colors: {
        chartLine: '#2ed573',
        gridRowLine: 'rgba(47, 53, 66,0.25)',
        background: '#F8F9FD'
    },
    font: {
        family: 'Play, sans-serif',
        color: 'rgba(47, 53, 66,0.5)',
        size: 15 * DEFAULT_PIXEL_RATIO,
        style: 'normal'
    }
}

export const defaultParameters: Parameters = {
    padding: 50 * DEFAULT_PIXEL_RATIO,
    pixelRatio: DEFAULT_PIXEL_RATIO,
    theme: defaultTheme,
    rowsCount: 5
}