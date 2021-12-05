interface Classroom {
    number: number
}

interface Seat {
    desk: number
    pos: 1 | 2
}

interface Student {
    classroom: number
    seatPlace: Seat
    name: string
}


/*const classrooms: Array<Classroom> = [{number: 1}, {number: 212}]

const students: Array<Student> = [
    {classroom: 1, seatPlace: {desk: 3, pos: 2}, name: 'Katya'},
    {classroom: 1, seatPlace: {desk: 4, pos: 2}, name: 'Olya'},

    {classroom: 212, seatPlace: {desk: 1, pos: 1}, name: 'Yars'},
    {classroom: 212, seatPlace: {desk: 2, pos: 1}, name: 'Daniel'},
    {classroom: 212, seatPlace: {desk: 2, pos: 2}, name: 'Kirill'},
    {classroom: 1, seatPlace: {desk: 1, pos: 1}, name: 'Petya'},
    {classroom: 1, seatPlace: {desk: 2, pos: 1}, name: 'Sasha'},
    {classroom: 1, seatPlace: {desk: 2, pos: 2}, name: 'Nikita'}
]*/


const getJson = async (url) => {
    const response: Response = await fetch(url)

    if (!response.ok)
        throw new Error(`Error by URL: ${url}, error status: ${response.status} !`)
    else
        return await response.json()
}

const groupByClassroom = (students: Array<Student>): any => {
    return students.reduce((result, student: Student) => {
        (result[student.classroom] = result[student.classroom] || []).push(student)
        return result
    }, {})
}


// Map: <deskNumber ---> its array of students>
const getMapForStudents = (studentsInOneClassroom: Array<Student>): Map<number, Array<Student>> => {
    const response = new Map<number, Array<Student>>()
    studentsInOneClassroom.forEach(student => {
        if (!response.has(student.seatPlace.desk))
            response.set(student.seatPlace.desk, [])

        response.get(student.seatPlace.desk).push(student)
    })
    return response
}

// Map: <classroomNumber ---> its map>
const getMapsArray = (grouped: any, classrooms: Array<Classroom>): Map<number, Map<number, Array<Student>>> => {
    const response: Map<number, Map<number, Array<Student>>> = new Map<number, Map<number, Array<Student>>>()
    classrooms.forEach((classroom: Classroom): void => {
        if (grouped[classroom.number]) {
            response.set(classroom.number, getMapForStudents(grouped[classroom.number]))
        }
    })
    return response
}

const getDeskHTML = (deskNumber: number, studentsThere: Array<Student>): string => {
    const first = (studentsThere || []).find(student => student.seatPlace.pos === 1)?.name || '-'
    const second = (studentsThere || []).find(student => student.seatPlace.pos === 2)?.name || '-'

    return `<div class="desk">
                <div class="number">${deskNumber}</div>
                <div class="seats">
                    <div class="seat">${first}</div>
                    <div class="seat">${second}</div>
                </div>
            </div>`
}

const getClassroomHTML = (classroomNumber: number, desksToStudents: Map<number, Array<Student>>) => {
    let response: string = `<h2>Classroom № ${classroomNumber}</h2><div class="classroom">`

    for (let counter: number = 1; counter <= 30; ++counter) {
        response += getDeskHTML(counter, desksToStudents?.get(counter) || [])
    }

    response += '</div>'

    return response
}

const getClassroomsHTML = (classrooms: Array<Classroom>,
                           parsedData: Map<number, Map<number, Array<Student>>>): string => {
    let response = ``

    classrooms.forEach(classroom => response += getClassroomHTML(classroom.number, parsedData.get(classroom.number)))

    return response
}


const run = (): void => {
    getJson('./classrooms.json').then((classrooms: Array<Classroom>): void => {
        getJson('./students.json').then((students: Array<Student>): void => {
            const groupedByClassroomStudentsObj = groupByClassroom(students)
            console.log(groupedByClassroomStudentsObj)
            const response = getMapsArray(groupedByClassroomStudentsObj, classrooms)


            document.getElementById('app').insertAdjacentHTML('beforeend', getClassroomsHTML(classrooms, response))
        })
    })
}


document.addEventListener('DOMContentLoaded', run)

