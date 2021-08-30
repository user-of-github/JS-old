const solve = (input) => {
    const MAX_PAGES = 1000
    const allWrittenPages = new Set(input.split(',').map(item => Number.parseInt(item)))

    let currentLeft = 1, currentRight = 1, counter = 1
    let response = ''
    while (counter <= MAX_PAGES) {
        if (!allWrittenPages.has(counter)) {
            ++counter
            continue
        }

        currentLeft = counter
        while (counter <= MAX_PAGES && allWrittenPages.has(counter))
            currentRight = counter++

        response += currentRight === currentLeft ? currentLeft.toString() : `${currentLeft.toString()}-${currentRight.toString()}`
        response += ','
        ++counter
    }
    return response.slice(0, -1)
}

const fs = require('fs')
const input = fs.readFileSync(0, 'utf-8')
console.log(solve(input))
