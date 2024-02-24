import {
  ExpirationComplete,
  Listener,
  OrderStatus,
  Subjects,
} from "@saiticky/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
export class ExpirationCompletedListener extends Listener<ExpirationComplete> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;
  async onMessage(data: ExpirationComplete["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("No order was found");
    }
    if(order.status===OrderStatus.Complete){
      return msg.ack()
    }
    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    msg.ack();
  }
}
