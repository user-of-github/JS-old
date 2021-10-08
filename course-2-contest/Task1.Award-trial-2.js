const checkIfAwardSuits = (managersCount, accountsSums, award) => {
    let number = 0
    accountsSums.forEach(sum => number += Math.floor(sum / award))
    return number >= managersCount
}

/*
int binarySearchRightHanded(const std::vector<int> &numbers, const auto &condition)
{
    int left = 1;  // left, right — левая и правая границы
    int right = *(std::max_element(std::begin(numbers), std::end(numbers)));
    while (left < right - 1)
    {
        const auto middle = (left + right) >> 1;  // middle — середина области поиска
        std::cout << "BEGIN:\tleft: " << left << " | right: " << right << " | middle: " << middle
                  << " | func(middle) = "
                  << condition(middle) << " arr[middle] = " << numbers.at(middle) << '\n';
        if (condition(middle))
            left = middle;
        else  // Сужение границ
            right = middle - 1;
    }
    return right;
}
 */
const binarySearchRightHanded = (sums, managersCount) => {
    let left = 1  // left, right — левая и правая границы
    let right = sums[0]
    while (left < right - 1) {
        const middle = (left + right) >> 1  // middle — середина области поиска

        if (checkIfAwardSuits(managersCount, sums, middle))
            left = middle
        else  // Сужение границ
            right = middle - 1
    }
    return checkIfAwardSuits(managersCount, sums, right) ? right : left
}

const solve = (managersCount, accountsSums) => {
    accountsSums.sort((a, b) => b - a)


    const response = binarySearchRightHanded(accountsSums, managersCount)
    return (checkIfAwardSuits(managersCount, accountsSums, response) ? response : 0)
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

        console.log(solve(data.managersCount, data.accountsSums))
        readline.close()
    }).on(
        'close',
        () => process.exit(0)
    )
}

run()