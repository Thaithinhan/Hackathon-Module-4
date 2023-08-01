var root = document.querySelector('#root');
root.innerHTML = "<h1> Hello Rikkei!</h1>";
var Sex;
(function (Sex) {
    Sex[Sex["MALE"] = 0] = "MALE";
    Sex[Sex["FEMALE"] = 1] = "FEMALE";
})(Sex || (Sex = {}));
var students = [{ name: "Thái Thị Nhàn", age: 33, sex: Sex.FEMALE },
    { name: "Võ Gia Huy", age: 23, sex: Sex.MALE },
    { name: "Trần Đăng Khoa", age: 30, sex: Sex.MALE }];
function renderStudents(students) {
    var studentList = document.querySelector("tbody");
    students.forEach(function (student, index) {
        studentList.innerHTML += "\n        <tr>\n        <td>".concat(student.name, "</td>\n        <td>").concat(student.age, "</td>\n        <td>").concat(student.sex === Sex.MALE ? 'Male' : 'Female', "</td>\n        <td><button onclick=\"handleEdit(").concat(index, ")\">Edit</button></td>\n        </tr>\n        ");
    });
}
var btnAddStudent = document.querySelector('#addStudent');
btnAddStudent.addEventListener('click', function (event) {
    event.preventDefault();
    var name = document.querySelector('#name').value;
    var age = parseInt(document.querySelector('#age').value);
    var sex = document.querySelector('#sex').value == 'Male' ? Sex.MALE : Sex.FEMALE;
    students.push({ name: name, age: age, sex: sex });
    var studentList = document.querySelector("tbody");
    studentList.innerHTML = "";
    renderStudents(students);
    document.querySelector('#name').value = "";
    document.querySelector('#age').value = "";
});
//FUNCTIONS Edit 
var editIndex = null;
var handleEdit = function (index) {
    editIndex = index;
    var student = students[index];
    if (student) {
        document.querySelector('#editName').value = student.name;
        document.querySelector('#editAge').value = student.age.toString();
        document.querySelector('#editSex').value = student.sex === Sex.MALE ? 'Male' : 'Female';
    }
};
var btnEditStudent = document.querySelector('#editStudent');
btnEditStudent.addEventListener('click', function (event) {
    event.preventDefault();
    if (editIndex !== null) {
        var name_1 = document.querySelector('#editName').value;
        var age = parseInt(document.querySelector('#editAge').value);
        var sex = document.querySelector('#editSex').value == 'Male' ? Sex.MALE : Sex.FEMALE;
        students[editIndex] = { name: name_1, age: age, sex: sex };
        var studentList = document.querySelector("tbody");
        studentList.innerHTML = "";
        renderStudents(students);
    }
    document.querySelector('#editName').value = "";
    document.querySelector('#editAge').value = "";
    document.querySelector('#editSex').value = "Male";
});
var sortByName = function () {
    students.sort(function (a, b) { return a.name.localeCompare(b.name); });
    var studentList = document.querySelector("tbody");
    studentList.innerHTML = "";
    renderStudents(students);
};
var sortByAge = function () {
    students.sort(function (a, b) { return a.age - b.age; });
    var studentList = document.querySelector("tbody");
    studentList.innerHTML = "";
    renderStudents(students);
};
var sortBySex = function () {
    students.sort(function (a, b) { return a.sex - b.sex; });
    var studentList = document.querySelector("tbody");
    studentList.innerHTML = "";
    renderStudents(students);
};
renderStudents(students);
