import { handleError } from "../utils/error.js";
import User from "../models/user.model.js";
import generateToken from "../utils/token.js";
import cloudinaryHelper from "../utils/cloudinaryHelper.js";
import { uploadToGCS, deleteFromGCS } from "../utils/googleCloudHelper.js";

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

    const parsedPhoneNumber = parseInt(phoneNumber);
    const uploadedImage = await cloudinaryHelper.uploadToCloudinary(
      profilePic,
      "profile"
    );

    const newUser = new User({
      name,
      email,
      phoneNumber: parsedPhoneNumber,
      role,
      password,
      profile: {
        image: {
          url: uploadedImage.url,
          public_id: uploadedImage.public_id,
        },
        bio: "",
        skills: [],
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

    // Validate required fields
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user and include password for checking
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Role validation
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account is not authorized with the current role.",
      });
    }

    // Generate JWT token
    const token = await generateToken(user._id, user.role);

    // Send cookie with secure settings
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
    });

    const { password: pwd, ...userData } = user._doc;

    res.status(200).json({
      message: "Login Successful!",
      user: userData,
      success: true,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal Server Error" });
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
    handleError(error, res);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber, bio, skills } = req.body;
    const profilePic = req.files?.profilePic?.[0];
    const resume = req.files?.resume?.[0];
    const skillsArray = skills?.split(",").map((s) => s.trim());
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }

    // Update basic user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Handle profile picture upload (using Cloudinary)
    if (profilePic) {
      const uploadedImage = await cloudinaryHelper.uploadToCloudinary(
        profilePic,
        "profile"
      );

      // Delete previous profilePic if stored
      if (user.profile.image?.public_id) {
        await cloudinaryHelper.deleteFromCloudinary(
          user.profile.image.public_id
        );
      }

      user.profile.image = {
        url: uploadedImage.url,
        public_id: uploadedImage.public_id,
      };
    }

    // Handle resume upload
    if (resume) {
      try {
        const uploadedResume = await uploadToGCS(resume, "resumes");

        // Delete previous resume if exists
        if (user.profile.resume?.fileName) {
          await deleteFromGCS(user.profile.resume.fileName);
        }

        user.profile.resume = {
          url: uploadedResume.url,
          fileName: uploadedResume.fileName,
          originalName: uploadedResume.originalName,
        };

        const updatedUser = user.toObject();
        delete updatedUser.password;

        return res.status(200).json({
          message: "Profile updated successfully!",
          success: true,
          user: updatedUser,
        });
      } catch (error) {
        console.error("Error uploading resume:", error);
        return res.status(500).json({
          message: "Error uploading resume",
          success: false,
        });
      }
    }
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully!",
      success: true,
    });
  } catch (error) {
    handleError(error, res);
  }
};
