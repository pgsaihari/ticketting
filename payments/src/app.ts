import express from "express";
import 'express-async-errors' 
import { json } from "body-parser";
import { NotFoundError } from "@saiticky/common";
import { errorHandler,currentUser } from "@saiticky/common";
import cookieSession from "cookie-session";
import { createChargeRouter } from "./routes/new";




const app = express();
app.set("trust proxy",true)
app.use(json());
app.use(cookieSession({
  signed:false,
  secure:false
}))
app.use(currentUser)
app.use(createChargeRouter)

// error handler
app.get('*',async()=>{
  throw new NotFoundError()
})
app.use(errorHandler)

export {app};