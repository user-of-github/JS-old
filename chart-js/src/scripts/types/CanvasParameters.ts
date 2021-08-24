export interface CanvasParameters {
    reference: HTMLCanvasElement | null
    context: CanvasRenderingContext2D | null
    fullWidth: number
    fullHeight: number
    workspaceHeight: number
    workspaceWidth: number
    pixelRatio: number
    padding: number
}

export const PIXEL_RATIO: number = 4
export const WORKSPACE_PADDING: number = 20

export const createDefaultCanvasParameters = (): CanvasParameters => {
    return {
        reference: null,
        context: null,
        fullWidth: 4,
        fullHeight: 4,
        padding: 4,
        workspaceHeight: 4,
        workspaceWidth: 4,
        pixelRatio: 4
    }
}