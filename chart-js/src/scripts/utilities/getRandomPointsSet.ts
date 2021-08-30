import {Point} from "../types/Point";

export const getRandomPointsSet = (): Array<Point> => {
    const response: Array<Point> = Array<Point>()
    const leftBorder: number = Math.random() * 100 * (-1)
    const rightBorder: number = Math.random() * 10
    const step: number = (rightBorder - leftBorder) / 5

    for (let x: number = leftBorder; x <= rightBorder; x += step) {
        response.push({x: x, y: Math.random() * (rightBorder - leftBorder) + leftBorder})
    }
    return response
}