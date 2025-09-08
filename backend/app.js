import express from 'express';
import product from './routes/productRoutes.js';
const app =express();


//middleware
app.use(express.json());



//Rputes 
app.use('/api/v1', product);

  
export default app;


