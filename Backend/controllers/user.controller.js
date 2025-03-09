import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

const register = async (req, res) => {
  try {
    const { fullName, email, phoneNo, password, role } = req.body;
    if (!fullName || !email || !phoneNo || !password || !role) {
      // throw new ApiError(400, "Something is missing");
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


    const existedUser = await User.findOne({ email });
    console.log(existedUser);
    if (existedUser) {
      throw new ApiError(409, "User already exist with this email");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      phoneNo,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto:cloudResponse.secure_url,
      }
    });

    const createdUser = await User.findById(user._id).select("-password");

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid user credentials",
        success: false,
      });
    }

    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role.",
        success: false,
      });
    }

    const tokenData = { userId: user._id };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNo: user.phoneNo,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {}
};

const update = async (req, res) => {
  try {
    const { fullName, email, phoneNo, bio, skills } = req.body;

    //cloudinary
    const file = req.file;
    

    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; //Middleware

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;

    if (phoneNo) user.phoneNo = phoneNo;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save cloudinary url
      user.profile.resumeOriginal = file.originalname; //Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNo: user.phoneNo,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { register, login, logout, update };
