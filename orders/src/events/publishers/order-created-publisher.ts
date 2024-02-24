import { Publisher,OrderCreatedEvent,Subjects } from "@saiticky/common";
import { natsWrapper } from "../../nats-wrapper";
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated=Subjects.OrderCreated
}

// new OrderCreatedPublisher(natsWrapper.client).publish({

// })