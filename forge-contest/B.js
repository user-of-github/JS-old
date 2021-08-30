const getRoots = (k, F) => {
    const a = 1
    const b = (2 ** k) * ((2 ** k) - 3)
    const c = (-1) * (2 ** (2 * k)) * 2 * F

    const discriminant = b * b - 4 * a * c

    if (discriminant < 0)
        return []

    const squareRootDiscriminant = Math.sqrt(discriminant)

    const x1 = ((-1) * b + squareRootDiscriminant) / (4 * a)
    const x2 = ((-1) * b - squareRootDiscriminant) / (4 * a)

    return [x1, x2]
}

const check = (teams, plays) => {
    let fights = 0
    while (teams % 2 === 0) {
        fights += teams >> 1
        teams >>= 1
    }
    fights += ((teams - 1) * teams) >> 1

    return fights === plays
}
const solve = (input) => {
    const F = input
    const answers = []
    for (let k = 0; k <= 60; ++k) {
        answers.push(...(getRoots(k, F).filter(teams => teams > 0 && Number.isInteger(teams) && check(teams, F))))
    }
    answers.sort((a, b) => b - a)
    answers.length === 0 && answers.push(-1)
    return Array.from(new Set(answers))
}

const fs = require('fs')
const input = fs.readFileSync(0, 'utf-8')
console.log(solve(Number.parseInt(input)).reverse().join('\n'))