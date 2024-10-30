import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validationMiddleware = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };
};

export default validationMiddleware;
