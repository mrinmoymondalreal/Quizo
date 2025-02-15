import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { configDotenv } from "dotenv";
if (process.env.NODE_ENV?.toString() !== "production") configDotenv();

import authRouter from "./routes/auth";
import quizzesRouter from "./routes/quizzes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.FRONTEND_URL || "",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.error(err);
      res.status(500).send("INTERNAL_SERVER_ERROR");
    } catch (e) {
      res.status(500).send("INTERNAL_SERVER_ERROR");
    }
    next();
  }
);

// Routers for routes
// auth router for logina and signup
app.use(authRouter);
// quizzes router for quizzes
app.use(quizzesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
