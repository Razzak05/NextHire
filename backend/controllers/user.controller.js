import { handleError } from "../utils/error.js";
import User from "../models/user.model.js";
import generateToken from "../utils/token.js";
import cloudinaryHelper from "../utils/cloudinaryHelper.js";

export const Register = async (req, res) => {
  try {
    const { name, email, phoneNumber, role, password } = req.body;
    const profilePic = req.file;

    if (!name || !email || !phoneNumber || !role || !password || !profilePic) {
      return res.status(400).json("Require all the input fields");
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json("User already Exists !");
    }

    const uploadResult = await cloudinaryHelper.uploadToCloudinary(
      profilePic,
      "profile"
    );
    const newUser = new User({
      name,
      email,
      phoneNumber,
      role,
      password,
      profile: {
        profilePic: uploadResult.url,
        profilePicPublicId: uploadResult.public_id,
      },
    });

    await newUser.save();

    return res.status(201).json({
      message: "User Registered Successfully !",
      user: {
        _id: newUser._id,
        name: newUser.name,
        phonenumber: newUser.phoneNumber,
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
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.json("Require all the input field");
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exists !" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json("Invalid Credentials");
    }

    if (role !== user.role) {
      return res
        .status(400)
        .json({ message: "Account is not authorized with the current role." });
    }

    const token = await generateToken(user._id, user.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contact: user.phoneNumber,
      profile: user.profile,
    };

    res.status(200).json({
      message: "Login Successful !",
      user,
      success: true,
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

    return res
      .status(200)
      .json({ message: "Logged Out Successfully !", success: true });
  } catch (error) {
    error(error, res);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber, bio, skills } = req.body;
    const skillsArray = skills?.split(",");
    const userId = req.user._id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found !",
        success: false,
      });
    }

    // update data
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume comes later here...
    await user.save();

    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).json({
      message: "Profile updated successfully !",
      user,
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
