import express from 'express';
import cookieParser from "cookie-parser";
import mongoInit from './models/mongo.js';
import router from './routes/router.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

app.use(router);
mongoInit(app);
