var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const getJson = (url) => __awaiter(this, void 0, void 0, function* () {
    const response = yield fetch(url);
    if (!response.ok)
        throw new Error(`Error by URL: ${url}, error status: ${response.status} !`);
    else
        return yield response.json();
});
const groupByClassroom = (students) => {
    return students.reduce((result, student) => {
        (result[student.classroom] = result[student.classroom] || []).push(student);
        return result;
    }, {});
};
// Map: <deskNumber ---> its array of students>
const getMapForStudents = (studentsInOneClassroom) => {
    const response = new Map();
    studentsInOneClassroom.forEach(student => {
        if (!response.has(student.seatPlace.desk))
            response.set(student.seatPlace.desk, []);
        response.get(student.seatPlace.desk).push(student);
    });
    return response;
};
// Map: <classroomNumber ---> its map>
const getMapsArray = (grouped, classrooms) => {
    const response = new Map();
    classrooms.forEach((classroom) => {
        if (grouped[classroom.number]) {
            response.set(classroom.number, getMapForStudents(grouped[classroom.number]));
        }
    });
    return response;
};
const getDeskHTML = (deskNumber, studentsThere) => {
    var _a, _b;
    const first = ((_a = (studentsThere || []).find(student => student.seatPlace.pos === 1)) === null || _a === void 0 ? void 0 : _a.name) || '-';
    const second = ((_b = (studentsThere || []).find(student => student.seatPlace.pos === 2)) === null || _b === void 0 ? void 0 : _b.name) || '-';
    return `<div class="desk">
                <div class="number">${deskNumber}</div>
                <div class="seats">
                    <div class="seat">${first}</div>
                    <div class="seat">${second}</div>
                </div>
            </div>`;
};
const getClassroomHTML = (classroomNumber, desksToStudents) => {
    let response = `<h2>Classroom № ${classroomNumber}</h2><div class="classroom">`;
    for (let counter = 1; counter <= 30; ++counter) {
        response += getDeskHTML(counter, (desksToStudents === null || desksToStudents === void 0 ? void 0 : desksToStudents.get(counter)) || []);
    }
    response += '</div>';
    return response;
};
const getClassroomsHTML = (classrooms, parsedData) => {
    let response = ``;
    classrooms.forEach(classroom => response += getClassroomHTML(classroom.number, parsedData.get(classroom.number)));
    return response;
};
const run = () => {
    getJson('./classrooms.json').then((classrooms) => {
        getJson('./students.json').then((students) => {
            const groupedByClassroomStudentsObj = groupByClassroom(students);
            console.log(groupedByClassroomStudentsObj);
            const response = getMapsArray(groupedByClassroomStudentsObj, classrooms);
            document.getElementById('app').insertAdjacentHTML('beforeend', getClassroomsHTML(classrooms, response));
        });
    });
};
document.addEventListener('DOMContentLoaded', run);
//# sourceMappingURL=index.js.map