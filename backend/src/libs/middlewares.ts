import { NextFunction, Request, Response } from "express";
import { getUserById } from "./utils";

export function checkUser() {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.user_id)
      return res.status(401).send("UNAUTHORIZED") as unknown as void;
    const user = await getUserById(req.cookies.user_id);
    if (!user) return res.status(401).send("UNAUTHORIZED") as unknown as void;
    res.locals.user = user;
    next();
  };
}
