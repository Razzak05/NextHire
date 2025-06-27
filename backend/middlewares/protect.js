import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { handleError } from "../utils/error";

const protect = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(404)
        .json({ message: "No token exists login please !", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user.id;
    const user = await User.findById({ userId }).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "No Authorized !", success: false });
    }

    req.user = user;

    next();
  } catch (error) {
    handleError(error, res);
  }
};

export default protect;
