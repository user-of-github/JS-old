import {Point} from './Point'
import {Theme} from './Theme'
import {createDefaultTheme} from '../utilities/defaultTheme'
import {CanvasParameters, createDefaultCanvasParameters, PIXEL_RATIO, WORKSPACE_PADDING} from './CanvasParameters'


export class ChartState {
    private readonly canvas: CanvasParameters
    private readonly allPoints: Array<Point>
    private renderedPoints: Array<Point>
    private renderFrom: number
    private renderTo: number
    private minX: number
    private maxX: number
    private minY: number
    private maxY: number
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
        this.canvas.fullWidth = this.canvas.reference.offsetWidth * this.canvas.pixelRatio
        this.canvas.fullHeight = this.canvas.reference.offsetHeight * this.canvas.pixelRatio
        this.canvas.reference.width = this.canvas.fullWidth
        this.canvas.reference.height = this.canvas.fullHeight
        this.canvas.workspaceWidth = this.canvas.fullWidth - this.canvas.padding * 2
        this.canvas.workspaceHeight = this.canvas.fullHeight - this.canvas.padding * 2

        this.updateAuxiliaryValues()
        this.renderFrom = this.minX
        this.renderTo = this.maxX
        this.filterPointsToRender()


        this.theme = createDefaultTheme()
    }

    public render(): void {
        this.filterPointsToRender()
        this.paintBackground()
        this.drawAxes()
    }

    private drawAxes(): void {
        this.updateAuxiliaryValues()
        if (this.theme.drawAxes) {
            this.canvas.context.beginPath()
            this.canvas.context.lineWidth = this.theme.axesWidth
            this.canvas.context.strokeStyle = this.theme.axesColor
            this.drawXAxis()
            this.drawYAxis()

            this.drawArrows()
            this.canvas.context.stroke()
            this.canvas.context.closePath()
        }
    }

    private paintBackground(): void {
        this.canvas.context.beginPath()
        this.canvas.context.clearRect(0, 0, this.canvas.fullWidth, this.canvas.fullHeight)
        this.canvas.context.strokeStyle = this.theme.chartBackground
        this.canvas.context.fillStyle = this.theme.chartBackground
        this.canvas.context.rect(0, 0, this.canvas.fullWidth, this.canvas.fullHeight)
        this.canvas.context.fill()
        this.canvas.context.closePath()
    }

    private drawXAxis(): void {
        this.canvas.context.moveTo(this.canvas.padding, this.canvas.padding + this.marginXAxis)
        this.canvas.context.lineTo(this.canvas.padding + this.canvas.workspaceWidth, this.canvas.padding + this.marginXAxis)
    }

    private drawArrows(): void {
        this.theme.drawArrows && this.drawYArrow()
        this.theme.drawArrows && this.drawXArrow()
    }

    private drawYArrow(): void {
        const deltaX: number = 4, deltaY: number = 10
        if (this.marginXAxis === 0)
            return
        this.canvas.context.moveTo(this.canvas.padding + this.marginYAxis - deltaX * this.canvas.pixelRatio, this.canvas.padding + deltaY * this.canvas.pixelRatio)
        this.canvas.context.lineTo(this.canvas.padding + this.marginYAxis, this.canvas.padding)
        this.canvas.context.lineTo(this.canvas.padding + this.marginYAxis + deltaX * this.canvas.pixelRatio, this.canvas.padding + deltaY * this.canvas.pixelRatio)
    }

    private drawXArrow(): void {
        const deltaY: number = 4, deltaX: number = 10
        if (this.marginXAxis === 0)
            return
        this.canvas.context.moveTo(this.canvas.padding + this.canvas.workspaceWidth - deltaX * this.canvas.pixelRatio,
            this.canvas.padding + this.marginXAxis - deltaY * this.canvas.pixelRatio)
        this.canvas.context.lineTo(this.canvas.padding + this.canvas.workspaceWidth, this.canvas.padding+ this.marginXAxis)
        this.canvas.context.lineTo(this.canvas.padding + this.canvas.workspaceWidth - deltaX * this.canvas.pixelRatio, this.canvas.padding +
            this.marginXAxis + deltaY * this.canvas.pixelRatio)
    }

    private drawYAxis(): void {
        this.canvas.context.moveTo(this.canvas.padding + this.marginYAxis, this.canvas.padding)
        this.canvas.context.lineTo(this.canvas.padding + this.marginYAxis, this.canvas.padding + this.canvas.workspaceHeight)
    }

    private updateAuxiliaryValues(): void {
        this.minX = Math.min(...this.renderedPoints.map((point: Point) => point.x))
        this.minY = Math.min(...this.renderedPoints.map((point: Point) => point.y))
        this.maxX = Math.max(...this.renderedPoints.map((point: Point) => point.x))
        this.maxY = Math.max(...this.renderedPoints.map((point: Point) => point.y))

        this.marginXAxis = this.maxY >= 0 && this.minY >= 0
            ? this.canvas.workspaceHeight
            : this.maxY < 0 && this.minY < 0
                ? 0
                : this.canvas.workspaceHeight * Math.abs(this.maxY) / Math.abs(this.maxY - this.minY)

        this.marginYAxis = this.maxX >= 0 && this.minX >= 0
            ? 0
            : this.maxX < 0 && this.minX < 0
                ? this.canvas.workspaceWidth
                : this.canvas.workspaceWidth * Math.abs(this.minX) / Math.abs(this.maxX - this.minX)
    }

    private filterPointsToRender(): void {
        this.renderedPoints = this.allPoints.filter((point: Point) =>
            point.x >= this.renderFrom && point.x <= this.renderTo)
    }
}