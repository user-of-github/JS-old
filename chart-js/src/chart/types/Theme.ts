interface Font {
    family: string
    size: number
    style: string
    color: string
}

interface Palette {
    chartLine: string
    background: string
    gridRowLine: string
}

interface Dimension {
    chartLine: number
    gridRowLine: number
}

export interface Theme {
    sizes: Dimension
    colors: Palette
    font: Font
}