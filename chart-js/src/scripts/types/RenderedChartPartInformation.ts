export interface RenderedChartPartInformation {
    minX: number
    maxX: number
    minY: number
    maxY: number
    scaleX: number
    scaleY: number
}

export const defaultChartPartInformation = (): RenderedChartPartInformation => {
    return {
        minX: 0,
        maxX: 0,
        scaleX: 0,
        minY: 0,
        maxY: 0,
        scaleY: 0
    }
}