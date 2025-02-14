import { Request, Response, Router } from "express";
import pool from "../database";
import { checkUser } from "../libs/middlewares";

const router = Router();

router.get("/quizzes", checkUser(), async (req: Request, res: Response) => {
  const query = "SELECT * FROM Quizzes WHERE teacher_id = $1";
  const values = [res.locals.user.id];
  const result = await pool.query(query, values);

  res.send(result.rows);
});

router.post("/quizzes", checkUser(), async (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title || !description || title.trim() == "" || description.trim() == "")
    return res.status(400).send("INVALID") as unknown as void;

  try {
    const query =
      "INSERT INTO Quizzes (title, description, teacher_id) VALUES ($1, $2, $3)";
    const values = [title, description, res.locals.user.id];
    await pool.query(query, values);

    res.send("ok") as unknown as void;
  } catch (err) {
    console.error(err);
    res.status(500).send("INTERNAL SERVER ERROR. Try Again Later");
  }
});

export default router;
