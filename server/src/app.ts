
import express from 'express';
export const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import path from 'path';
import studentRoute from "./routes/students"


//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
const corsOptions = {
    origin: ['http://localhost:3000', 'https://back-up-one.vercel.app'],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use('/uploads', express.static(path.join(__dirname, "public/uploads")))
//ROUTES
app.use('/api/v1/students', studentRoute);

//HANDLE ERRORS 
