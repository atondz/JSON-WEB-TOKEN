import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ERR_INTERNAL_SERVER_ERROR, ERR_UNAUTHORIED } from "../config/constant";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //B1 check có truyền token lên ko
    const bearerToken = req.headers.authorization;
    console.log("bearerToken", bearerToken);
    const token = bearerToken && bearerToken.split(" ")[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({ status: false, error: ERR_UNAUTHORIED });
    }
    // B2 Check token này có hợp lệ hay không
    const SECRET_KEY = process.env.JWT_SECRET || "";
    console.log("SECRET_KEY auth", SECRET_KEY);
    try {
      if (!jwt.verify(token, SECRET_KEY)) {
        return res.status(401).json({ status: false, error: ERR_UNAUTHORIED });
      }
    } catch (err) {
      return res.status(401).json({
        status: false,
        error: ERR_UNAUTHORIED,
        message: "Token Invalid!",
      });
    }

    // Lấy thông tin từ payload token
    const payloadJson = jwt.decode(token);
    console.log("payloadJson", payloadJson);

    if (payloadJson) {
      if (typeof payloadJson == "string") {
        res.locals.userData = JSON.parse(payloadJson);
      } else {
        res.locals.userData = payloadJson;
      }
    } else {
      return res.status(401).json({ status: false, error: ERR_UNAUTHORIED });
    }

    next();
  } catch (err) {
    console.log("Internal server", err);
    return res
      .status(500)
      .json({ status: false, error: ERR_INTERNAL_SERVER_ERROR });
  }
};

export default authMiddleware;
