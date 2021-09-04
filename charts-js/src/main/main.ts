import {ChartPlugin} from '../chart/types/ChartPlugin'
import {getChartData} from '../data/data'
import {transformTelegramData} from '../chart/utilities/transformTelegramData'


const startApplication = (): void => {
    const chart: ChartPlugin = new ChartPlugin(
        document.getElementById('canvas') as HTMLCanvasElement,
        transformTelegramData(getChartData())
    )


    chart.runRender()
}


document.addEventListener('DOMContentLoaded', startApplication)