import {CanvasData} from './CanvasData'
import {defaultParameters} from '../utilities/default'
import {TransformedChartData} from './TransformedChartData'


export class ChartPlugin {
    private readonly canvas: CanvasData
    private readonly data: TransformedChartData

    public constructor(canvasHTMLRef: HTMLCanvasElement, newData: any) {
        this.canvas = ChartPlugin.setUpCanvas(canvasHTMLRef)
        this.data = newData

        window.addEventListener('resize', () => this.resizeRender())
    }

    private mouseMoveTrigger(event: MouseEvent, proxy: any): void {
        proxy.mouse =
            {x: (event.clientX - this.canvas.reference.getBoundingClientRect().left) * defaultParameters.pixelRatio}
    }

    private mouseLeaveTrigger(proxy: any): void {
        proxy.mouse = null
    }

    public runRender(): void {
        const proxy: {} = new Proxy({}, {
            set(...args) {
                const result: boolean = Reflect.set(...args)
                window.requestAnimationFrame(render)
                return result
            }
        })
        this.canvas.reference.addEventListener('mousemove', (event: MouseEvent) => this.mouseMoveTrigger(event, proxy))
        this.canvas.reference.addEventListener('mouseleave', (event: MouseEvent) => this.mouseLeaveTrigger(proxy))

        const [yMin, yMax]: [number, number] = this.computeBoundaries()
        const yRatio: number = this.canvas.viewHeight / (yMax - yMin)
        const xRatio: number = this.canvas.viewWidth / (this.data.x.length - 2)
        const render = (): void => {
            this.clearBackground()
            this.drawYAxis()
            this.drawXAxis(xRatio, proxy)
            this.drawCharts(xRatio, yRatio, proxy)
        }

        render()
    }

    private static setUpCanvas(reference: HTMLCanvasElement): CanvasData {
        const [cssWidth, cssHeight, width, height] = ChartPlugin.getCanvasSizes(reference)

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
            viewHeight: height - defaultParameters.sizes.padding * 2,
            viewWidth: width
        }
    }

    private static getCanvasSizes(reference: HTMLCanvasElement): [number, number, number, number] {
        return [
            reference.offsetWidth,
            reference.offsetHeight,
            reference.offsetWidth * defaultParameters.pixelRatio,
            reference.offsetHeight * defaultParameters.pixelRatio
        ]
    }

    private resizeRender(): void {
        this.recountCanvasDimensions()
        this.runRender()
    }

    private recountCanvasDimensions(): void {
        const [cssWidth, cssHeight, width, height] = ChartPlugin.getCanvasSizes(this.canvas.reference)
        this.canvas.reference.width = width
        this.canvas.reference.height = height

        this.canvas.CSSWidth = cssWidth
        this.canvas.CSSHeight = cssHeight
        this.canvas.fullWidth = width
        this.canvas.fullHeight = height
        this.canvas.viewHeight = height - defaultParameters.sizes.padding * 2
        this.canvas.viewWidth = width
    }

    private clearBackground(): void {
        this.canvas.context.fillStyle = defaultParameters.theme.colors.background
        this.canvas.context.fillRect(0, 0, this.canvas.fullWidth, this.canvas.fullHeight)
    }

    private drawYAxis(): void {
        this.canvas.context.strokeStyle = defaultParameters.theme.colors.gridRowLine
        this.canvas.context.lineWidth = defaultParameters.sizes.gridRowLine
        this.canvas.context.fillStyle = defaultParameters.theme.font.color
        this.canvas.context.font =
            `${defaultParameters.theme.font.style} ${defaultParameters.theme.font.size}px ${defaultParameters.theme.font.family}`

        const [yMin, yMax]: [number, number] = this.computeBoundaries()
        const step: number = this.canvas.viewHeight / defaultParameters.rowsCount
        const textStep: number = (yMax - yMin) / defaultParameters.rowsCount

        this.canvas.context.beginPath()
        for (let counter = 1; counter <= defaultParameters.rowsCount; ++counter) {
            const y: number = step * counter
            this.canvas.context.moveTo(0, y + defaultParameters.sizes.padding)
            this.canvas.context.lineTo(this.canvas.fullWidth, y + defaultParameters.sizes.padding)
            this.canvas.context.fillText(Math.round(yMax - counter * textStep).toString(), 5,
                y + defaultParameters.sizes.padding - 10)
        }
        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private drawXAxis(xRatio: number, proxy): void {
        const step: number = Math.round(this.data.x.length / defaultParameters.colsCount)
        this.canvas.context.beginPath()
        for (let counter: number = 0; counter < this.data.x.length; ++counter) {
            const x: number = counter * xRatio
            if (counter % step === 0) {
                this.canvas.context.fillText(new Date(this.data.x[counter]).toLocaleDateString(),
                    x,
                    this.canvas.fullHeight - 10
                )
            }
            if (proxy.mouse && this.isOver(proxy.mouse, x)) {
                this.canvas.context.strokeStyle = defaultParameters.theme.colors.toolLine
                this.canvas.context.moveTo(x, defaultParameters.sizes.padding / 2)
                this.canvas.context.lineTo(x, this.canvas.fullHeight - defaultParameters.sizes.padding)

                this.canvas.context.stroke()
            }
        }
    }

    private drawCharts(xRatio: number, yRatio: number, proxy): void {
        this.data.lines.forEach(value => this.drawOneChart(value.values, xRatio, yRatio, value.color, proxy))
    }

    private drawOneChart(values: Array<number>, xRatio: number, yRatio: number, color: string, proxy): void {
        this.canvas.context.beginPath()
        this.canvas.context.save()
        this.canvas.context.lineWidth = defaultParameters.sizes.chartLine
        this.canvas.context.strokeStyle = color.trim() !== '' ? color.trim() : defaultParameters.theme.colors.chartLine

        values.forEach((y: number, index: number) => {
            const X: number = index * xRatio,
                Y: number = this.canvas.fullHeight - defaultParameters.sizes.padding - y * yRatio
            this.canvas.context.lineTo(X, Y)
        })

        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private drawCircleOnOver(x: number, y: number, color: string): void {
        this.canvas.context.fillStyle = color
        this.canvas.context.moveTo(x, y)
        this.canvas.context.arc(x, y, defaultParameters.sizes.circleOnOver, 0, Math.PI * 2)
        this.canvas.context.moveTo(x, y)
        this.canvas.context.fill()
        this.canvas.context.restore()
    }

    private computeBoundaries(): [number, number] {
        let minimum: number = this.data.lines[0].values[0] || 0,
            maximum: number = this.data.lines[0].values[0] || 0

        this.data.lines.forEach(line => {
            minimum = Math.min(minimum, Math.min(...line.values))
            maximum = Math.max(maximum, Math.max(...line.values))
        })
        return [minimum, maximum]
    }

    private isOver(mouse, x: number): boolean {
        if (!mouse)
            return false
        const width: number = this.canvas.fullWidth / this.data.x.length
        return Math.abs(x - mouse.x) < width >> 1
    }
}