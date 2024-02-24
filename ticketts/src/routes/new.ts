import express,{Request,Response} from "express"
import { body } from "express-validator";
import { requireAuth,ValidateRequest } from "@saiticky/common";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publishers";
import { natsWrapper } from "../nats-wrapper";
const router=express.Router();


router.post('/api/tickets',[
    body('title').not().isEmpty().withMessage('Title is Required'),
    body('price')
    .isFloat({gt:0})
    .not().isEmpty().withMessage("Price is required")

],ValidateRequest,requireAuth,async(req:Request,res:Response)=>{

    const {title,price}=req.body;
    const ticket=Ticket.build({
        title,price,userId:req.currentUser!.id
    })
    
    
    await ticket.save()
    await new TicketCreatedPublisher(natsWrapper.client).publish({
        id:ticket.id,
        title:ticket.title,
        price:ticket.price,
        userId:ticket.userId,version:ticket.version
    })
    res.status(201).send(ticket)
})


 
export {router as createTicketRouter}