import {TransformedChartData} from '../types/TransformedChartData'


export const transformTelegramData = (query): TransformedChartData => {
    const response: TransformedChartData = {x: [], lines: []}
    const keys: Array<string> = Array<string>()
    for (const key in query.types) {
        keys.push(key)
    }
    keys.forEach((key: string) => {
        const type: string = query.types[key]
        if (type === 'x') {
            response.x = query.columns.find((element: Array<string | number>) => element[0] === 'x').slice(1, -1)
            return
        }

        response.lines.push({
            name: query.names[key],
            color: query.colors[key],
            values: query.columns.find((element: Array<string | number>) => element[0] === key).slice(1, -1)
        })
    })
    return response
}