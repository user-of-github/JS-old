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
    toolLine: string
}

export interface Theme {
    colors: Palette
    font: Font
}