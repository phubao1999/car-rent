import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './db';
import { errorHandler } from './middlewares';
import { adminRouter, carRouter, userRouter } from './routes';
import { loggerStream } from './utils/logger.util';

// Connect DB
connectDB();
// APP init
const app = express();
app.use(morgan('combined', { stream: loggerStream }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/cars', carRouter);

app.use(errorHandler);

export default app;
