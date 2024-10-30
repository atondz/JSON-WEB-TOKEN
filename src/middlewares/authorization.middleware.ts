import { Request, Response, NextFunction } from "express";

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };

export default authorizationMiddleware;