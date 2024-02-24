import express from "express";
import 'express-async-errors' 
import { json } from "body-parser";
import { NotFoundError } from "@saiticky/common";
import { errorHandler,currentUser } from "@saiticky/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { showAllTickets } from "./routes";
import { updateTicket } from "./routes/update";




const app = express();
app.set("trust proxy",true)
app.use(json());
app.use(cookieSession({
  signed:false,
  secure:false
}))
app.use(currentUser)
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(showAllTickets)
app.use(updateTicket)
// error handler
app.get('*',async()=>{
  throw new NotFoundError()
})
app.use(errorHandler)

export {app};