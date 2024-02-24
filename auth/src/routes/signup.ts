import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { body } from "express-validator";

import { ValidateRequest,BadRequestError } from "@saiticky/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("email already in use");
      throw new BadRequestError("Email already in use");
    }
    const user = User.build({
      email,
      password,
    });
    await user.save().then(() => {
      // generate json web token
      if (!process.env.JWT_KEY) {
        throw new Error("error in token generation");
      }

      const userJwt = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_KEY
      );

      req.session = {
        jwt: userJwt,
      };
      res.status(201).send(user);
    });
  }
);

export { router as signUpRouter };
