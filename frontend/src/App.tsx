import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import TableComponent from "./components/TableComponent";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store/store";
import { getAllStudents } from "./redux/reducer/studentSlice";
import Formcomponent from "./components/FormComponent";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllStudents()).unwrap();
  }, [dispatch]);

  const students = useSelector((state: RootState) => state.students);

  return (
    <div className="App">
      <h1 className="text-center">STUDENTS MANAGER</h1>
      <TableComponent students={students} />
      <Formcomponent />
    </div>
  );
}

export default App;
