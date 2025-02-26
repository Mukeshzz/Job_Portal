import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = async (req, res) => {
  try {
    const { fullName, email, phoneNo, password, role } = req.body;
    if (!fullName || !email || !phoneNo || !password || !role ) {
      throw new ApiError(400, "Something is missing");
    }

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
    console.log(email);
    console.log(password);
    console.log(role);
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    console.log(user);

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
      phoneNumber: user.phoneNumber,
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
    if (!fullName || !email || !phoneNo || !bio || !skills) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const skillsArray = skills.split(",");
    const userId = req.id; //Middleware

    let user = await User.findById(userId);

    (user.fullName = fullName),
      (user.email = email),
      (user.phoneNo = phoneNo),
      (user.profile.bio = bio),
      (user.profile.skills = skillsArray);

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
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export { register, login, logout, update };
