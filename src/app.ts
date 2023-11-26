import 'express-async-errors';
import { usuarioRoute } from './routes';
import { handleErrors } from './error';
import express from 'express';
import 'reflect-metadata';

const app = express();

app.use(express.json());

app.use('/users', usuarioRoute);

app.use(handleErrors);

export default app;
