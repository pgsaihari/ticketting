import { Publisher, OrderCreatedEvent, Subjects } from '@saiticky/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
