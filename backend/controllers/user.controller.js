import { error } from "../utils/error.js";
import User from "../models/user.model.js";

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
      message: "New user is created",
      user: {
        _id: newUser._id,
        name: newUser.name,
        phonenumber: newUser.phonenumber,
        role: newUser.role,
      },
      success: true,
    });
  } catch (error) {
    error(error, res);
  }
};
