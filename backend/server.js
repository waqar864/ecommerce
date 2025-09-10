import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDB } from './config/db.js';
dotenv.config({ path: 'backend/config/config.env' });
connectMongoDB();

//handle uncaught exception error 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

const port = process.env.PORT || 3000;






const server = app.listen(port, () => {
    // console.log("Server is working on http://localhost:8000");
    console.log(`Server is running on PORT http://localhost:${port}`);

});

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});
