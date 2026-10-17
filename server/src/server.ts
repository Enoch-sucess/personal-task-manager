import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT: number = Number(process.env.PORT) || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

startServer();



// "email": "test@example.com",
// "username": "testuser",
// "password": "password123"
//  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYmVjNTUxMDkyYzk2Y2IzMDA3MmQ2YSIsImlhdCI6MTc5MDg5OTgxNCwiZXhwIjoxNzkxNTA0NjE0fQ.CFtdUTsnLQtrTEotAjxHYehSqcbrJnMDCcEKNgCjjfA"