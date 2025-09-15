import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';

const app =express();


//middleware
app.use(express.json());
app.use(cookieParser());


//Rputes 
app.use('/api/v1', product);
app.use('/api/v1', user);


app.use(errorHandleMiddleware);
  
export default app;


