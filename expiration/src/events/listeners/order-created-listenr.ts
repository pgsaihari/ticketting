import { Listener, OrderCreatedEvent,Subjects} from "@saiticky/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated=Subjects.OrderCreated
    queueGroupName: string=queueGroupName
    async onMessage(data:OrderCreatedEvent['data'],msg:Message){
        const delay = new Date(data.expiresAt).getTime()-new Date().getTime()
        console.log('waiting this many milliseconds to porcess the event')
        await expirationQueue.add({
            orderId:data.id

        },{
            delay
        })

        msg.ack();
        
    }
}