import {CanvasData} from './CanvasData'
import {defaultParameters} from '../utilities/default'


export class ChartPlugin {
    private readonly canvas: CanvasData
    private readonly data: any

    public constructor(canvasHTMLRef: HTMLCanvasElement, newData: any) {
        this.canvas = ChartPlugin.setUpCanvas(canvasHTMLRef)
        this.data = newData
    }

    public runRender(): void {
        this.clearBackground()
        this.drawRows()
        this.drawGraphic()
    }

    private static setUpCanvas(reference: HTMLCanvasElement): CanvasData {
        const cssWidth: number = reference.offsetWidth
        const cssHeight: number = reference.offsetHeight
        const width: number = cssWidth * defaultParameters.pixelRatio
        const height: number = cssHeight * defaultParameters.pixelRatio

        reference.width = width
        reference.height = height

        return {
            reference: reference,
            context: reference.getContext('2d'),
            pixelRatio: defaultParameters.pixelRatio,
            CSSWidth: cssWidth,
            CSSHeight: cssHeight,
            fullWidth: width,
            fullHeight: height,
            viewHeight: height - defaultParameters.padding * 2
        }
    }

    private clearBackground(): void {
        this.canvas.context.fillStyle = defaultParameters.theme.colors.background
        this.canvas.context.fillRect(0, 0, this.canvas.fullWidth, this.canvas.fullHeight)
    }

    private drawRows(): void {
        this.canvas.context.strokeStyle = defaultParameters.theme.colors.gridRowLine
        this.canvas.context.lineWidth = defaultParameters.theme.sizes.gridRowLine
        this.canvas.context.fillStyle = defaultParameters.theme.font.color
        this.canvas.context.font =
            `${defaultParameters.theme.font.style} ${defaultParameters.theme.font.size}px ${defaultParameters.theme.font.family}`

        const [yMin, yMax]: [number, number] = this.computeBoundaries()
        const step: number = this.canvas.viewHeight / defaultParameters.rowsCount
        const textStep: number = (yMax - yMin) / defaultParameters.rowsCount

        this.canvas.context.beginPath()
        for (let counter = 1; counter <= defaultParameters.rowsCount; ++counter) {
            const y: number = step * counter
            this.canvas.context.moveTo(0, y + defaultParameters.padding)
            this.canvas.context.lineTo(this.canvas.fullWidth, y + defaultParameters.padding)
            this.canvas.context.fillText(Math.floor(yMax - counter * textStep).toString(), 5,
                y + defaultParameters.padding - 10)
        }
        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private drawGraphic(): void {
        const [yMin, yMax]: [number, number] = this.computeBoundaries()
        const yRatio: number = this.canvas.viewHeight / (yMax - yMin)
        this.canvas.context.beginPath()
        this.canvas.context.lineWidth = defaultParameters.theme.sizes.chartLine
        this.canvas.context.strokeStyle = defaultParameters.theme.colors.chartLine
        for (const [x, y] of this.data) {
            this.canvas.context.lineTo(x, this.canvas.fullHeight - defaultParameters.padding - y * yRatio)
        }
        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private computeBoundaries(): [number, number] {
        const onlyValues: Array<number> = this.data.map(([x, y]) => y)
        return [Math.min(...onlyValues), Math.max(...onlyValues)]
    }
}