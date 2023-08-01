import axiosClient from "./axiosClient";

class StudentAPI {
    static getAllStudents() {
        const url = `/api/v1/students`
        return axiosClient.get(url);
    }
}

export default StudentAPI