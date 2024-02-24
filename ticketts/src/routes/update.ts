import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { body } from "express-validator";
import {
  ValidateRequest,
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
  BadRequestError,
} from "@saiticky/common";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is  required"),
    body("price").isFloat({ gt: 1 }).withMessage("Price is required"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    const { title, price } = req.body;
    if (!ticket) {
      throw new NotFoundError();
    }
    if(ticket.orderId){
      throw new BadRequestError('Ticket is reserved')
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title,
      price,
    });
    await ticket.save();
    await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,version:ticket.version
    });
    res.send(ticket);
  }
);

export { router as updateTicket };
