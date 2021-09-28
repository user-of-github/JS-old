const DIGITS = '0123456789'
const SIGNS = '>*+-'


const isDigit = (string, index) => DIGITS.includes(string[index])
const isSign = (string, index) => SIGNS.includes(string[index])
const isBracket = (string, index) => string[index] === '(' || string[index] === ')'
const isDice = (string, index) => string[index] === 'd'


const PRIORITIES = new Map(
    [
        ['+', 1],
        ['-', 1],
        ['*', 2],
        ['>', 0]
    ]
)

// data structure for reversal polish notation: instead of just "number" will be  object (structure) "number + its probability"
const OPERATIONS = new Map(
    [
        ['+', (left, right) => {
            return {
                number: left.number + right.number,
                probability: left.probability * right.probability
            }
        }], ['-', (left, right) => {
        return {
            number: left.number - right.number,
            probability: left.probability * right.probability
        }
    }], ['*', (left, right) => {
        return {
            number: left.number * right.number,
            probability: left.probability * right.probability
        }
    }], ['>', (left, right) => {
        return {
            number: left.number > right.number ? 1 : 0,
            probability: left.probability * right.probability
        }
    }]
    ]
)


// computing for two blocks like: [{}{}{}](*)[{}{}{}{}], where (*) - some operation
// why [] (*) [], but not {} (*) {} ?
// because when having d3, for example, it will be equal [{1, 0.33},{2, 0.33}, {3, 0.33}]
// so I must receive all the possible combinations for such d3 and d4, for example
const operateTwoBlocksWithNumbers = (lefts, rights, operation) => {
    const response = []
    lefts.forEach(left =>
        rights.forEach(right =>
            response.push(OPERATIONS.get(operation)(left, right))
        )
    )
    return response
}


const performSingleOperation = (numbersStack, signsStack) => {
    const second = numbersStack[numbersStack.length - 1]
    numbersStack.pop()

    const first = numbersStack[numbersStack.length - 1]
    numbersStack.pop()

    numbersStack.push(operateTwoBlocksWithNumbers(first, second, signsStack[signsStack.length - 1]))
    signsStack.pop()
}


const simpleNumberToType = (number) => [{
    number: number,
    probability: 1.00
}]


const trim = (string, baseCounter) => {
    while (baseCounter.index < string.length && string[baseCounter.index] === ' ')
        ++baseCounter.index
}


const getNumberFromString = (string, baseCounter) => {
    const from = baseCounter.index
    while (baseCounter.index < string.length && isDigit(string, baseCounter.index))
        ++baseCounter.index
    const response = Number.parseInt(string.slice(from, baseCounter.index))
    if (baseCounter.index >= string.length || !isDigit(string[baseCounter.index]))
        --baseCounter.index
    return response
}


const getDiceFromString = (string, baseCounter) => {
    const response = []
    ++baseCounter.index
    const from = baseCounter.index
    while (baseCounter.index < string.length && isDigit(string[baseCounter.index]))
        ++baseCounter.index

    const to = baseCounter.index === from ? from + 1 : baseCounter.index
    const depthOfCube = Number.parseInt(string.slice(from, to))
    const probability = 1 / depthOfCube
    for (let counter = 1; counter <= depthOfCube; ++counter)
        response.push({
            number: counter,
            probability: probability
        })
    return response
}


const executePriorityOperators = (numbersStack, signsStack, newPriority) => {
    while (signsStack.length > 0
    && numbersStack.length > 0
    && newPriority <= PRIORITIES.get(signsStack[signsStack.length - 1]))
        performSingleOperation(numbersStack, signsStack)
}

const calculate = (string) => {
    const numbersStack = []
    const signsStack = []

    const baseCounter = {
        index: 0
    }

    while (baseCounter.index < string.length) {
        trim(string, baseCounter)

        if (baseCounter.index >= string.length)
            break;

        if (isDigit(string, baseCounter.index)) {
            const num = simpleNumberToType(getNumberFromString(string, baseCounter))
            numbersStack.push(num)
            //console.log('FOUND NUMBER', num)
            //console.log('\t', numbersStack)
            //console.log('\t', signsStack)
        } else if (isDice(string, baseCounter.index)) {
            const dice = getDiceFromString(string, baseCounter)
            numbersStack.push(dice)
            //console.log('FOUND DICE: ', dice)
            //console.log('\t', numbersStack)
            //console.log('\t', signsStack)
        } else if (isBracket(string, baseCounter.index)) {
            if (string[baseCounter.index] === '(') {
                signsStack.push(string[baseCounter.index])
            } else if (string[baseCounter.index] === ')') {
                while (signsStack.length > 0 && signsStack[signsStack.length - 1] !== '(')
                    performSingleOperation(numbersStack, signsStack)
                signsStack.pop()
            }
            //console.log('FOUND BRACE, position: ', string[baseCounter.index])
            //console.log('\t', numbersStack)
            //console.log('\t', signsStack)
        } else if (isSign(string, baseCounter.index)) {
            //console.log('FOUND SIGN', string[baseCounter.index])
            if (signsStack.length === 0) {
                signsStack.push(string[baseCounter.index])
            } else if (signsStack[signsStack.length - 1] === '(') {
                signsStack.push(string[baseCounter.index])
            } else if (PRIORITIES.get(string[baseCounter.index]) > PRIORITIES.get(signsStack[signsStack.length - 1])) {
                signsStack.push(string[baseCounter.index])
            } else if (PRIORITIES.get(string[baseCounter.index]) <= PRIORITIES.get(signsStack[signsStack.length - 1])) {
                executePriorityOperators(numbersStack, signsStack, PRIORITIES.get(string[baseCounter.index]))
                signsStack.push(string[baseCounter.index])
            }
            // console.log('\t', numbersStack)
            // console.log('\t', signsStack)
        }
        ++baseCounter.index
    }

    while (signsStack.length !== 0)
        performSingleOperation(numbersStack, signsStack)

    return numbersStack[numbersStack.length - 1]
}


const transformAnswerToCorrect = answer => {
    // sum up probabilities with similar results (combine them)
    const values = new Set()
    const response = []
    answer.forEach(item => values.add(item.number))
    for (const num of values) {
        response.push({
            number: num,
            probability: answer.filter(item => item.number === num)
                .reduce((result, current) => result + current.probability, 0)
        })
    }
    response.sort((a, b) => a.number - b.number)
    return response
}

const run = () => {
    const readline = require('readline').createInterface(process.stdin, process.stdout)
    readline.on('line', line => {
        transformAnswerToCorrect(calculate(line.trim())).forEach(item => {
            console.log(item.number, ((item.probability) * 100).toFixed(2))
        })
        readline.close()
    }).on(
        'close',
        () => process.exit(0)
    )
}


run()