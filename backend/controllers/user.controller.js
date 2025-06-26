import { handleError } from "../utils/error.js";
import User from "../models/user.model.js";
import generateToken from "../utils/token.js";

export const Register = async (req, res) => {
  try {
    const { name, email, phonenumber, role, password } = req.body;

    if (!name || !email || !phonenumber || !role || !password) {
      console.log("Require all the input fields");
    }

    const user = await User.findOne({ email });
    if (user) {
      console.log("User already Exists !");
    }

    const newUser = new User({
      name,
      email,
      phonenumber,
      role,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      message: "New user is created successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        phonenumber: newUser.phonenumber,
        role: newUser.role,
      },
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json("Require all the input field");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists !" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json("Invalid Credentials");
    }

    const token = await generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    error(error, res);
  }
};

export const Logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      sameSite: true,
    });

    return res.status(200).json({ message: "Logged Out Successfully !" });
  } catch (error) {
    error(error, res);
  }
};
