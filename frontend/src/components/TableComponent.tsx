import React from "react";
import { Table } from "react-bootstrap";
interface Student {
  id: string;
  name: string;
  avatar: string;
  age: number;
  class: string;
}

// Xác định kiểu cho props của TableComponent
interface TableComponentProps {
  students: Student[];
}

const TableComponent: React.FC<TableComponentProps> = ({ students }) => {
  // console.log(students);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Avatar</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>
                <img src={student.avatar} alt="" />
              </td>
              <td>{student.class}</td>
              <td>
                <button className="btn btn-primary me-2">Edit</button>
                <button className="btn btn-danger">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
