import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app: Application = express();

// Local dev origin, plus any deployed client URLs from CLIENT_URL
// (comma-separated, no trailing slash).
const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
    : []),
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

export default app;
