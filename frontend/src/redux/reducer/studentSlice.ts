import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import StudentAPI from "../../api/studentsAPI";


export const getAllStudents = createAsyncThunk("getStudent", async () => {
    const response = await StudentAPI.getAllStudents()
    localStorage.setItem("students", JSON.stringify(response.data))
    // console.log(response);
    return response.data
})

interface Student {
    id: string;
    name: string;
    avatar: string;
    age: number;
    class: string;
}

let initialState = [];

// Try to load the initial state from localStorage.
try {
    const savedState = localStorage.getItem("students");
    if (savedState !== null) { // Check if savedState is not null
        initialState = JSON.parse(savedState);
    }
} catch (error) {
    console.error("Failed to load state from localStorage:", error);
}

const studentSlice = createSlice({
    name: "students",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [getAllStudents.fulfilled.type]: (state, action: PayloadAction<Student[]>) => {
            return state = action.payload
        }
    }
});

const { actions, reducer } = studentSlice;

export default reducer;