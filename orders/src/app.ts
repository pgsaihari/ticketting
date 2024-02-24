import express from "express";
import 'express-async-errors' 
import { json } from "body-parser";
import { NotFoundError } from "@saiticky/common";
import { errorHandler,currentUser } from "@saiticky/common";
import cookieSession from "cookie-session";
//  * ROUTER IMPORT STATEMENTS
import { indexOrderRouter } from "./routes";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";
import { deleteOrderRouter } from "./routes/delete";

// *
const app = express();
app.set("trust proxy",true)
app.use(json());
app.use(cookieSession({
  signed:false,
  secure:false
}))

// * router middlewares
app.use(currentUser)
app.use(indexOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)
app.use(newOrderRouter)

// error handler
app.get('*',async()=>{
  throw new NotFoundError()
})
app.use(errorHandler)

export {app};