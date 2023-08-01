import express, { Request, Response } from 'express';
import fs from 'fs';
import { Student } from '../models/student';
import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

const router = express.Router();
const uploadUrl = 'http://localhost:4000/uploads';

// Config multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    // Reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const studentPath: string = path.join(__dirname, "../data/student.json")

let students: Student[] = JSON.parse(fs.readFileSync(studentPath, 'utf8'));
// console.log(students);

router.get('/', (req: Request, res: Response) => {
    res.json(students);
});

router.post('/', upload.single('avatar'), (req: Request, res: Response) => {

    console.log(req.file);

    const newStudent: Student = {
        id: uuid(), // generate a unique id
        name: req.body.name,
        age: parseInt(req.body.age),
        class: req.body.class,
        avatar: req.file ? `${uploadUrl}/${req.file.filename}` : undefined // Kiểm tra xem req.file có tồn tại hay không
    };

    students.push(newStudent);

    fs.writeFileSync(studentPath, JSON.stringify(students, null, 2)); // Write the updated student list to the JSON file

    res.status(201).json(newStudent);
});

router.put('/:id', upload.single('avatar'), (req: Request, res: Response) => {
    const id = req.params.id;

    // Find the student by id
    const studentIndex = students.findIndex(s => s.id == id);

    if (studentIndex !== -1) { // If the student is found
        const updatedStudent: Student = {
            id: students[studentIndex].id, // Keep the original id
            name: req.body.name || students[studentIndex].name, // If a new name is not provided, keep the old one
            age: parseInt(req.body.age) || students[studentIndex].age, // Same for age
            class: req.body.class || students[studentIndex].class, // Same for class
            avatar: req.file ? req.file.path : students[studentIndex].avatar // If a new avatar is not uploaded, keep the old one
        };

        students[studentIndex] = updatedStudent; // Replace the old student data with the updated one

        fs.writeFileSync(studentPath, JSON.stringify(students, null, 2)); // Write the updated student list to the JSON file

        res.status(200).json(updatedStudent); // Respond with the updated student
    } else {
        res.status(404).send({ message: "Student not found" }); // If the student is not found, respond with a 404 status code and a message
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = req.params.id;

    // Find the student by id
    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex !== -1) { // If the student is found
        const deletedStudent = students.splice(studentIndex, 1); // Remove the student from the array
        fs.writeFileSync(studentPath, JSON.stringify(students, null, 2)); // Write the updated student list to the JSON file
        res.status(200).json(deletedStudent[0]); // Respond with the deleted student
    } else {
        res.status(404).send({ message: "Student not found" }); // If the student is not found, respond with a 404 status code and a message
    }
});

export default router;
