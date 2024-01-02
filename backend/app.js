import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { limit } from './constants.js';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({limit: `${limit}`}));
app.use(express.urlencoded({extended: true , limit: `${limit}`}));

app.use(cookieParser());

app.set("/Astro_folder");
app.set("view-engine", "html");
app.use("/static", express.static("static"));
app.use("/images", express.static("images"));

app.get("/", (req,res)=>{
    res.status(200).sendFile(__dirname + "/Log_In_Form.html");
});

import useRoute from './routes/user.routes.js'
app.use("/api/v1/users", useRoute);

export { app };