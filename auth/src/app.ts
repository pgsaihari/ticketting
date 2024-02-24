import express from "express";
import 'express-async-errors' 
import { json } from "body-parser";

import cookieSession from "cookie-session";


import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler, NotFoundError } from "@saiticky/common";


const app = express();
app.set("trust proxy",true)
app.use(json());
app.use(cookieSession({
  signed:false,
  secure:false,//!need to change look git
}))

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

// error handler
app.get('*',async()=>{
  throw new NotFoundError()
})
app.use(errorHandler)

export {app};