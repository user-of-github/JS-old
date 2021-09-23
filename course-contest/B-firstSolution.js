const numberOfCombinationsOfNBy2 = n => (n * (n - 1)) >> 1


const getNumberOfFightsFromNumberOfTeams = (numberOfTeams, alreadyCounted, sourceNumberOfFights, response) => {
    const numberOfTeamsCopy = numberOfTeams
    let numberOfFights = 0
    while (numberOfTeams % 2 === 0) {
        if (alreadyCounted[numberOfTeams] !== undefined) {
            numberOfFights += alreadyCounted[numberOfTeams]
            if (numberOfFights === sourceNumberOfFights) {
                response.push(numberOfTeamsCopy)
            }
            return numberOfFights
        }
        numberOfFights += numberOfTeams >> 1
        numberOfTeams >>= 1
    }


    if (alreadyCounted[numberOfTeams] !== undefined) {
        numberOfFights += alreadyCounted[numberOfTeams]
        if (numberOfFights === sourceNumberOfFights) {
            response.push(numberOfTeamsCopy)
        }
        return numberOfFights
    }

    numberOfFights += numberOfCombinationsOfNBy2(numberOfTeams)
    if (numberOfFights === sourceNumberOfFights) {
        response.push(numberOfTeamsCopy)
    }

    return numberOfFights
}

const solve = (numberOfFights) => {
    const howMuchToCount = numberOfFights * 50000
    const teamsToFights = new Array(howMuchToCount)
    const response = []
    for (let teams = 1; teams < howMuchToCount; ++teams) {
        teamsToFights[teams] = getNumberOfFightsFromNumberOfTeams(teams, teamsToFights, numberOfFights, response)
        if (response.length >= 2)
            return response
    }


    response.length === 0 && response.push(-1)
    return response
}


// const fs = require('fs')
// const input = fs.readFileSync(0, 'utf-8')
// console.log(solve(Number.parseInt(input)).reverse().join('\n'))
//
// console.log(solve(Number.parseInt(process.argv.slice(2)[0])).reverse().join('\n'))

for (let counter = 1; counter <= 100; ++counter) {
    console.log(`teams: ${solve(counter)} => plays: ${counter}`)
}

