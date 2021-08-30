import {Point} from './Point'
import {Theme} from './Theme'
import {createDefaultTheme} from '../utilities/defaultTheme'
import {CanvasParameters, createDefaultCanvasParameters, PIXEL_RATIO, WORKSPACE_PADDING} from './CanvasParameters'
import {defaultChartPartInformation, RenderedChartPartInformation} from './RenderedChartPartInformation'


export class ChartState {
    private readonly canvas: CanvasParameters
    private readonly allPoints: Array<Point>
    private renderedPoints: Array<Point>
    private renderFrom: number
    private renderTo: number
    private measurements: RenderedChartPartInformation
    private marginXAxis: number
    private marginYAxis: number
    private theme: Theme


    public constructor(points: Array<Point>, canvasDiv: HTMLCanvasElement) {
        this.allPoints = points
        this.renderedPoints = this.allPoints.slice()
        this.canvas = createDefaultCanvasParameters()
        this.canvas.pixelRatio = PIXEL_RATIO
        this.canvas.padding = WORKSPACE_PADDING * this.canvas.pixelRatio
        this.canvas.reference = canvasDiv
        this.canvas.context = this.canvas.reference.getContext('2d')
        this.resize()
        this.measurements = defaultChartPartInformation()
        this.updateAuxiliaryValues()
        this.renderFrom = this.measurements.minX
        this.renderTo = this.measurements.maxX
        this.filterPointsToRender()


        this.theme = createDefaultTheme()
    }

    public render(): void {
        this.filterPointsToRender()
        this.paintBackground()
        this.drawAxes()
        this.drawPoints(this.getTransformedPoints())
    }

    private drawAxes(): void {
        this.updateAuxiliaryValues()
        if (this.theme.drawAxes) {
            this.canvas.context.lineWidth = this.theme.axesWidth
            this.canvas.context.strokeStyle = this.theme.axesColor
            this.drawXAxis()
            this.drawYAxis()

            this.drawArrows()

            this.canvas.context.save()
        }
    }

    private paintBackground(): void {
        this.canvas.context.strokeStyle = this.theme.chartBackground
        this.canvas.context.fillStyle = this.theme.chartBackground
        this.canvas.context.fillRect(0, 0, this.canvas.fullWidth, this.canvas.fullHeight)
    }

    private drawXAxis(): void {
        this.canvas.context.beginPath()
        this.canvas.context.moveTo(this.canvas.padding, this.canvas.padding + this.marginXAxis)
        this.canvas.context.lineTo(this.canvas.padding + this.canvas.workspaceWidth,
            this.canvas.padding + this.marginXAxis)
        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private drawArrows(): void {
        this.theme.drawArrows && this.drawYArrow()
        this.theme.drawArrows && this.drawXArrow()
    }

    private drawYArrow(): void {
        const deltaX: number = 4, deltaY: number = 10
        if (this.marginXAxis === 0)
            return
        this.canvas.context.beginPath()
        this.canvas.context.moveTo(this.canvas.padding + this.marginYAxis - deltaX * this.canvas.pixelRatio,
            this.canvas.padding + deltaY * this.canvas.pixelRatio)
        this.canvas.context.lineTo(this.canvas.padding + this.marginYAxis, this.canvas.padding)
        this.canvas.context.lineTo(this.canvas.padding + this.marginYAxis + deltaX * this.canvas.pixelRatio,
            this.canvas.padding + deltaY * this.canvas.pixelRatio)
        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private drawXArrow(): void {
        const deltaY: number = 4, deltaX: number = 10
        if (this.marginXAxis === 0)
            return
        this.canvas.context.beginPath()
        this.canvas.context.moveTo(this.canvas.padding + this.canvas.workspaceWidth - deltaX * this.canvas.pixelRatio,
            this.canvas.padding + this.marginXAxis - deltaY * this.canvas.pixelRatio)
        this.canvas.context.lineTo(this.canvas.padding + this.canvas.workspaceWidth,
            this.canvas.padding + this.marginXAxis)
        this.canvas.context.lineTo(this.canvas.padding + this.canvas.workspaceWidth - deltaX * this.canvas.pixelRatio,
            this.canvas.padding +
            this.marginXAxis + deltaY * this.canvas.pixelRatio)
        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private drawYAxis(): void {
        this.canvas.context.beginPath()
        this.canvas.context.moveTo(this.canvas.padding + this.marginYAxis, this.canvas.padding)
        this.canvas.context.lineTo(this.canvas.padding + this.marginYAxis,
            this.canvas.padding + this.canvas.workspaceHeight)
        this.canvas.context.stroke()
        this.canvas.context.closePath()
    }

    private updateAuxiliaryValues(): void {
        this.measurements.minX = Math.min(...this.renderedPoints.map((point: Point) => point.x))
        this.measurements.minY = Math.min(...this.renderedPoints.map((point: Point) => point.y))
        this.measurements.maxX = Math.max(...this.renderedPoints.map((point: Point) => point.x))
        this.measurements.maxY = Math.max(...this.renderedPoints.map((point: Point) => point.y))

        this.marginXAxis = this.measurements.maxY >= 0 && this.measurements.minY >= 0
            ? this.canvas.workspaceHeight
            : this.measurements.maxY < 0 && this.measurements.minY < 0
                ? 0
                : this.canvas.workspaceHeight * Math.abs(this.measurements.maxY) /
                Math.abs(this.measurements.maxY - this.measurements.minY)

        this.marginYAxis = this.measurements.maxX >= 0 && this.measurements.minX >= 0
            ? 0
            : this.measurements.maxX < 0 && this.measurements.minX < 0
                ? this.canvas.workspaceWidth
                : this.canvas.workspaceWidth * Math.abs(this.measurements.minX) /
                Math.abs(this.measurements.maxX - this.measurements.minX)

        this.measurements.scaleX =
            this.canvas.workspaceWidth / Math.abs(this.measurements.minX - this.measurements.maxX)
        this.measurements.scaleY =
            this.canvas.workspaceHeight / Math.abs(this.measurements.minY - this.measurements.maxY)
    }

    private filterPointsToRender(): void {
        this.renderedPoints = this.allPoints.filter((point: Point) =>
            point.x >= this.renderFrom && point.x <= this.renderTo)
    }

    private getTransformedPoints(): Array<Point> {
        console.log(this.renderedPoints)
        return this.renderedPoints.map((point: Point) => {
            const newPoint: Point = {x: point.x, y: point.y}
            newPoint.x = this.marginYAxis + newPoint.x * this.measurements.scaleX
            newPoint.y = this.marginXAxis - newPoint.y * this.measurements.scaleY
            return newPoint
        })
    }

    private drawPoints(points: Array<Point>): void {
        console.log(points)
        console.log(this.measurements)
        this.canvas.context.fillStyle = this.theme.chartColor
        this.canvas.context.strokeStyle = this.theme.chartColor
        points.forEach((point: Point) => {
            this.canvas.context.beginPath()
            this.canvas.context.arc(this.canvas.padding + point.x, this.canvas.padding + point.y,
                this.theme.dotsRadius * this.canvas.pixelRatio, 0, Math.PI * 2)
            this.canvas.context.fill()
            this.canvas.context.closePath()
        })

    }

    private resize(): void {
        this.canvas.fullWidth = this.canvas.reference.offsetWidth * this.canvas.pixelRatio
        this.canvas.fullHeight = this.canvas.reference.offsetHeight * this.canvas.pixelRatio
        this.canvas.reference.width = this.canvas.fullWidth
        this.canvas.reference.height = this.canvas.fullHeight
        this.canvas.workspaceWidth = this.canvas.fullWidth - this.canvas.padding * 2
        this.canvas.workspaceHeight = this.canvas.fullHeight - this.canvas.padding * 2
    }
}