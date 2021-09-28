const checkIfSuits = (sums, wantedSum, managersCount) =>
    sums.reduce((result, current) => result + Math.floor(current / wantedSum), 0) >= managersCount


const binarySearchRight = (sums, managersCount) => {
    let left = 1
    let right = sums[0]
    let middle = (left + right) >> 1

    while (left <= right) {
        middle = (left + right) >> 1

        if (left === middle)
            break;

        if (checkIfSuits(sums, middle, managersCount) === true)
            left = middle
        else
            right = middle
    }

    return left;
}

const solve = data => {
    data.accountsSums.sort((a, b) => b - a)
    const binarySearchRightResponse = binarySearchRight(data.accountsSums, data.managersCount)
    return (checkIfSuits(data.accountsSums, binarySearchRightResponse, data.managersCount) ? binarySearchRightResponse : 0)
}

const run = () => {
    const readline = require('readline').createInterface(process.stdin, process.stdout)
    const data = {
        accountsCount: -1,
        managersCount: -1,
        accountsSums: []
    }
    let linesCounter = -1
    readline.on('line', line => {
        if (data.accountsCount === -1) {
            data.accountsCount = Number.parseInt(line.trim().split(' ')[0])
            data.managersCount = Number.parseInt(line.trim().split(' ')[1])
            linesCounter = 0
        } else {
            data.accountsSums.push(Number.parseInt(line.trim()))
            ++linesCounter
        }
        if (data.accountsCount === -1 || linesCounter < data.accountsCount)
            return;

        console.log(solve(data))
        readline.close()
    }).on(
        'close',
        () => process.exit(0)
    )
}

run()