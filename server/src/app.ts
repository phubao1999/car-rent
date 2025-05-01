import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import { errorHandler } from './middlewares';
import { adminRouter, carRouter, userRouter } from './routes';

// Connect DB
connectDB();
// APP init
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/car', carRouter);

app.use(errorHandler);

export default app;
