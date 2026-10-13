import express, { Application } from "express";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import cors from "cors";

const app: Application = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

export default app;
