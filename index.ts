var root: any = document.querySelector('#root');

root.innerHTML = "<h1> Hello Rikkei!</h1>";

enum Sex {
    MALE,
    FEMALE
}

interface Student {
    name: string;
    age: number;
    sex: Sex
}

var students: Student[] = [{ name: "Thái Thị Nhàn", age: 33, sex: Sex.FEMALE },
{ name: "Võ Gia Huy", age: 23, sex: Sex.MALE },
{ name: "Trần Đăng Khoa", age: 30, sex: Sex.MALE }]

function renderStudents(students: Student[]): void {
    let studentList: any = document.querySelector("tbody");
    students.forEach((student, index) => {
        studentList.innerHTML += `
        <tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.sex === Sex.MALE ? 'Male' : 'Female'}</td>
        <td><button onclick="handleEdit(${index})">Edit</button></td>
        </tr>
        `;
    });
}

let btnAddStudent: any = document.querySelector('#addStudent')
btnAddStudent.addEventListener('click', function (event: any) {
    event.preventDefault();
    let name = (document.querySelector('#name') as HTMLInputElement).value;
    let age = parseInt((document.querySelector('#age') as HTMLInputElement).value);
    let sex = (document.querySelector('#sex') as HTMLSelectElement).value == 'Male' ? Sex.MALE : Sex.FEMALE;
    students.push({ name: name, age: age, sex: sex });
    let studentList: any = document.querySelector("tbody");
    studentList.innerHTML = ""
    renderStudents(students);
    (document.querySelector('#name') as HTMLInputElement).value = "";
    (document.querySelector('#age') as HTMLInputElement).value = "";
});

//FUNCTIONS Edit 
let editIndex: number | null = null;
let handleEdit = (index: number) => {
    editIndex = index;
    let student = students[index];
    if (student) {
        (document.querySelector('#editName') as HTMLInputElement).value = student.name;
        (document.querySelector('#editAge') as HTMLInputElement).value = student.age.toString();
        (document.querySelector('#editSex') as HTMLSelectElement).value = student.sex === Sex.MALE ? 'Male' : 'Female';
    }
}

let btnEditStudent: any = document.querySelector('#editStudent')
btnEditStudent.addEventListener('click', function (event: any) {
    event.preventDefault();
    if (editIndex !== null) {
        let name = (document.querySelector('#editName') as HTMLInputElement).value;
        let age = parseInt((document.querySelector('#editAge') as HTMLInputElement).value);
        let sex = (document.querySelector('#editSex') as HTMLSelectElement).value == 'Male' ? Sex.MALE : Sex.FEMALE;
        students[editIndex] = { name: name, age: age, sex: sex };
        let studentList: any = document.querySelector("tbody");
        studentList.innerHTML = ""
        renderStudents(students);
    }
    (document.querySelector('#editName') as HTMLInputElement).value = "";
    (document.querySelector('#editAge') as HTMLInputElement).value = "";
    (document.querySelector('#editSex') as HTMLSelectElement).value = "Male";
});

let sortByName = () => {
    students.sort((a, b) => a.name.localeCompare(b.name));
    let studentList: any = document.querySelector("tbody");
    studentList.innerHTML = ""
    renderStudents(students);
}

let sortByAge = () => {
    students.sort((a, b) => a.age - b.age);
    let studentList: any = document.querySelector("tbody");
    studentList.innerHTML = ""
    renderStudents(students);
}

let sortBySex = () => {
    students.sort((a, b) => a.sex - b.sex);
    let studentList: any = document.querySelector("tbody");
    studentList.innerHTML = ""
    renderStudents(students);
}

renderStudents(students)