import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { ValidateRequest } from "@saiticky/common";
import { BadRequestError } from "@saiticky/common";
import { Password } from "../services/password";
import jwt from 'jsonwebtoken'
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("You mus supply message"),
  ],ValidateRequest,
 async (req: Request, res: Response) => {
       const {email,password}=req.body 
       const existingUser=await User.findOne({email})
       if(!existingUser){
                throw new BadRequestError("Account Does not exist")
       }
       const passwordMatch=await Password.compare(existingUser.password,password)
       if(!passwordMatch){
        throw new BadRequestError("invalid credentials")

       }
       else{
        if (!process.env.JWT_KEY) {
                throw new Error("error in token generation");
              }
        
              const userJwt = jwt.sign(
                {
                  id: existingUser._id,
                  email: existingUser.email,
                },
                process.env.JWT_KEY!
              );
        
              req.session = {
                jwt: userJwt,
              };
              res.status(201).send(" user logged in :ok");
       }
  }
);

export { router as signInRouter };
