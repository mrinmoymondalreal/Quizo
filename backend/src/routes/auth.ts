import { Request, Response, Router } from "express";
import pool from "../database";
import bcrypt from "bcrypt";
import { checkUser } from "../libs/middlewares";

const router = Router();

router.get("/user", checkUser(), async (req: Request, res: Response) => {
  res.send(res.locals.user);
});

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password || username.trim() == "" || password.trim() == "")
    return res.status(400).send("INVALID") as unknown as void;
  const query = "SELECT id, username, password FROM Users WHERE username = $1";
  const values = [username];
  const result = await pool.query(query, values);

  if (result.rows.length === 0)
    return res.status(404).send("Invalid Credentials") as unknown as void;

  const isCorrect = await bcrypt.compare(password, result.rows[0].password);

  if (!isCorrect)
    return res.status(404).send("Invalid Credentials") as unknown as void;

  res.cookie("user_id", result.rows[0].id, {
    httpOnly: true,
    path: "/",
    // Should be added in roduction
    secure: process.env.MODE == "prod",
    sameSite: process.env.MODE == "prod" ? "none" : "lax",
  });

  res.send("ok") as unknown as void;
});

router.post("/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password || username.trim() == "" || password.trim() == "")
    return res.status(400).send("INVALID") as unknown as void;
  const query = "SELECT id FROM Users WHERE username = $1";
  const values = [username];
  const result = await pool.query(query, values);

  if (result.rows.length > 0)
    return res
      .status(400)
      .send(
        "Username Already Taken. Choose another username."
      ) as unknown as void;

  const q2 =
    "INSERT INTO Users(username, password) VALUES ($1, $2) RETURNING id";
  const v2 = [username, await bcrypt.hash(password, 10)];
  const r2 = await pool.query(q2, v2);

  res.cookie("user_id", r2.rows[0].id, {
    httpOnly: true,
    path: "/",
    domain: "localhost",
    secure: false,
  });

  res.send("ok") as unknown as void;
});

router.get("/logout", async (req: Request, res: Response) => {
  res.clearCookie("user_id", { path: "/" });
  res.send("ok");
});

export default router;
