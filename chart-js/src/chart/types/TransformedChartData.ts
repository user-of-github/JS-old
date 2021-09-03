interface SingleChart {
    name: string
    color: string
    values: Array<number>
}

export interface TransformedChartData {
    x: Array<number>
    lines: Array<SingleChart>
}