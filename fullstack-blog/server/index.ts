import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { PORT, UPLOADED_ASSETS_FOLDER } from './constants/constants';
import * as Validator from './validators';
import { UserController, PostController } from './controllers/index';
import { isAuthorized, handleValidatorErrors } from './utils/index';


dotenv.config();

const databaseConnectionUrl: string = process.env.DB_CONNECT as string;

mongoose.connect(databaseConnectionUrl)
    .then((): void => console.info('DB connection successful'))
    .catch(error => console.error('DB connection error', error));


const storage = multer.diskStorage({
    destination: (_, __, callback) => callback(null, UPLOADED_ASSETS_FOLDER),
    filename: (_, file, callback) => callback(null, file.originalname)
});

const upload = multer({storage: storage});

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/upload', isAuthorized, upload.single('image'), async (request: Request, response: Response) => {
    response.json({url: `${UPLOADED_ASSETS_FOLDER}/${request.file?.originalname}`});
});

app.post('/auth/register', Validator.registerValidator, handleValidatorErrors, UserController.register);
app.post('/auth/login', Validator.loginValidator, handleValidatorErrors, UserController.logIn);
app.get('/auth/me', isAuthorized, UserController.getMe);

app.get('/posts', PostController.getAllPosts);
app.get('/posts/:id', PostController.getPost);
app.post('/posts', isAuthorized, Validator.postCreateValidator, handleValidatorErrors, PostController.createPost);
app.delete('/posts/:id', isAuthorized, PostController.removePost);
app.patch('/posts/:id', isAuthorized, Validator.postUpdateValidator, handleValidatorErrors, PostController.updatePost);


app.listen(PORT, (): void => {
    console.info('Server listening on port ', PORT);
});
