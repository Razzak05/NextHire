import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { handleError } from "../utils/error.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No token found, please login.",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (err) {
    handleError(err, res);
  }
};

export const recruiter = async (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Not authorized as recruiter", success: false });
  }
};
