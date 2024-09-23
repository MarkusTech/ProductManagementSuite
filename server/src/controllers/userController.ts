import joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import User from "../models/User";
import Token from "../models/Token";
import sendEmail from "../utils/sendEmail";

const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: "1d",
  });
};

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const schema = joi.object({
      name: joi.string().min(2).max(25).required(),
      email: joi.string().required().email(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, name, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json("User with this email already exists.");

    const newUser = new User({ name, email, password });
    const user = await newUser.save();

    if (user) {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          phone: user.phone,
          photo: user.photo,
        },
        process.env.SECRET_KEY as string,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
      });
      return res.status(201).json(token);
    } else {
      return res.status(400).json("User registration failed.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("Wrong email/password combination.");

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword)
      return res.status(400).json("Wrong email/password combination.");

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json(token);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

const logout = async (req: Request, res: Response): Promise<Response> => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json("You have been logged out.");
};

const user = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json("User was not found.");

    const { _id, name, email, photo, phone, bio } = user;
    return res.status(200).json({ _id, name, email, photo, phone, bio });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

const loggedIn = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY as string);
    if (verified) {
      return res.json(true);
    } else {
      return res.json(false); // Return false if the token is not verified
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

const updateProfile = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const schema = joi.object({
      name: joi.string().min(2).max(25).required(),
      email: joi.string().required().email(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json("User was not found.");

    user.name = req.body.name || user.name;
    user.photo = req.body.photo || user.photo;
    user.phone = req.body.phone || user.phone;
    user.bio = req.body.bio || user.bio;

    const updatedUser = await user.save();
    const updatedToken = jwt.sign(
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
      },
      process.env.SECRET_KEY as string
    );

    return res.json(updatedToken);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const schema = joi.object({
      password: joi.string().min(6).required(),
      oldPassword: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json("User was not found.");

    const { password, oldPassword } = req.body;
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword)
      return res.status(400).json("Old password is incorrect.");

    user.password = password;
    await user.save();
    return res.status(200).json("Password has been changed.");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

const forgotPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User does not exist.");

    const token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    const resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * 60 * 1000, // 30 mins
    }).save();

    const resetUrl = `${process.env.CLIENT}/reset-password/${resetToken}`;
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please click on the link below to reset your password.</p>
        <p><h4>Note:</h4> This reset link is valid for only 30 minutes</p>
        <a href=${resetUrl} clicktracking=Off>${resetUrl}</a>
        <p>Regards,</p>
        <p>The inventory system team</p>
      `;

    const subject = "Password Reset";
    const send_to = user.email; // Use send_to instead of sendTo
    const sent_from = process.env.EMAIL_USER || ""; // Provide a default value or handle undefined

    try {
      // Adjusted call to sendEmail
      await sendEmail({ subject, message, send_to, sent_from });
      return res
        .status(200)
        .json({ success: true, message: "Email has been sent." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json("Email was not sent: " + error.message);
      }
      return res.status(500).json("An unexpected error occurred.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

const resetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password } = req.body;
    const { resetToken } = req.params;

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });

    if (!userToken)
      return res.status(404).json("Token is invalid or has expired.");

    const user = await User.findById(userToken.userId);
    if (!user) return res.status(404).json("User does not exist.");

    user.password = password;
    await user.save();

    return res.status(200).json("Password has been reset. You can now log in.");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json(error.message);
    }
    return res.status(500).json("An unexpected error occurred.");
  }
};

export {
  register,
  login,
  logout,
  user,
  loggedIn,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};
