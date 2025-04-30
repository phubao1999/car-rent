import express from 'express';
import { connectDB } from './db';
import { errorHandler } from './middlewares';
import { adminRouter, userRouter } from './routes';

// Connect DB
connectDB();
// APP init
const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);

export default app;
