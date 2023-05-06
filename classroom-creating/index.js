var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
var getJson = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                if (!!response.ok) return [3 /*break*/, 2];
                throw new Error("Error by URL: " + url + ", error status: " + response.status + " !");
            case 2: return [4 /*yield*/, response.json()];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var groupByClassroom = function (students) {
    return students.reduce(function (result, student) {
        (result[student.classroom] = result[student.classroom] || []).push(student);
        return result;
    }, {});
};
// Map: <deskNumber ---> its array of students>
var getMapForStudents = function (studentsInOneClassroom) {
    var response = new Map();
    studentsInOneClassroom.forEach(function (student) {
        if (!response.has(student.seatPlace.desk))
            response.set(student.seatPlace.desk, []);
        response.get(student.seatPlace.desk).push(student);
    });
    return response;
};
// Map: <classroomNumber ---> its map>
var getMapsArray = function (grouped, classrooms) {
    var response = new Map();
    classrooms.forEach(function (classroom) {
        if (grouped[classroom.number]) {
            response.set(classroom.number, getMapForStudents(grouped[classroom.number]));
        }
    });
    return response;
};
var getDeskHTML = function (deskNumber, studentsThere) {
    var _a, _b;
    var first = ((_a = (studentsThere || []).find(function (student) { return student.seatPlace.pos === 1; })) === null || _a === void 0 ? void 0 : _a.name) || '-';
    var second = ((_b = (studentsThere || []).find(function (student) { return student.seatPlace.pos === 2; })) === null || _b === void 0 ? void 0 : _b.name) || '-';
    return "<div class=\"desk\">\n                <div class=\"number\">" + deskNumber + "</div>\n                <div class=\"seats\">\n                    <div class=\"seat\">" + first + "</div>\n                    <div class=\"seat\">" + second + "</div>\n                </div>\n            </div>";
};
var getClassroomHTML = function (classroomNumber, desksToStudents) {
    var response = "<h2>Classroom \u2116 " + classroomNumber + "</h2><div class=\"classroom\">";
    for (var counter = 1; counter <= 30; ++counter) {
        response += getDeskHTML(counter, (desksToStudents === null || desksToStudents === void 0 ? void 0 : desksToStudents.get(counter)) || []);
    }
    response += '</div>';
    return response;
};
var getClassroomsHTML = function (classrooms, parsedData) {
    var response = "";
    classrooms.forEach(function (classroom) { return response += getClassroomHTML(classroom.number, parsedData.get(classroom.number)); });
    return response;
};
var run = function () {
    getJson('./classrooms.json').then(function (classrooms) {
        getJson('./students.json').then(function (students) {
            var groupedByClassroomStudentsObj = groupByClassroom(students);
            console.log(groupedByClassroomStudentsObj);
            var response = getMapsArray(groupedByClassroomStudentsObj, classrooms);
            document.getElementById('app').insertAdjacentHTML('beforeend', getClassroomsHTML(classrooms, response));
        });
    });
};
document.addEventListener('DOMContentLoaded', run);
