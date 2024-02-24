import { Listener,OrderCancelledEvent,Subjects,OrderStatus } from "@saiticky/common";
import { queueGroupName } from "./queuGroupName";
import { Order } from "../../models/order";
import { Message } from "node-nats-streaming";

export class OrderCancelledListener extends Listener<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled=Subjects.OrderCancelled
    queueGroupName: string=queueGroupName
    async onMessage(data:OrderCancelledEvent['data'],msg:Message){
        const order=await Order.findOne({
            _id:data.id,
            version:data.version-1
        })
        if(!order){
            throw new Error("order Not found")
        }
        order.set({status:OrderStatus.Cancelled})
        await order.save()
        msg.ack()
    }

}