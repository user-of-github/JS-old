import {ChartPlugin} from '../chart/types/ChartPlugin'


const startApplication = (): void => {
    const chart: ChartPlugin = new ChartPlugin(
        document.getElementById('canvas') as HTMLCanvasElement,
        [[0, 0], [200, 300], [400, 200], [600, 300], [800, 800], [900, 100]]
    )

    chart.runRender()
}


document.addEventListener('DOMContentLoaded', startApplication)