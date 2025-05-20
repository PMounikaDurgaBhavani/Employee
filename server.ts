import express from "express";
import dotenv from "dotenv";
import employee from "./routes/employee";
import manager from "./routes/manager";
const app = express();
dotenv.config();
app.use(express.json());
app.use("/api", employee);
app.use("/api", manager);

const port = process.env.port;

(async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("The error is :", error);
  }
})();
