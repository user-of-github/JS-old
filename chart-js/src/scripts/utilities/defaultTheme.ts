import {Theme} from '../types/Theme'

export const createDefaultTheme = (): Theme => {
    return {
        chartBackground: 'rgba(247, 241, 227,1.0)',
        axesColor: '#2C3A47',
        textColor: '#2C3A47',
        chartColor: '#c0392b',
        gridColor: 'rgba(44, 58, 71,0.1)',
        axesWidth: 7,
        drawAxes: true,
        drawArrows: true
    }
}