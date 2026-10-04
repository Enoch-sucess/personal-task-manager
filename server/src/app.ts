import express, { Application } from "express";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";

const app: Application = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.get("/api/task-test", (req, res) => {
  res.send("task test route works");
});
export default app;
