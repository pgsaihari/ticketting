import {Publisher,Subjects,TicketUpdatedEvent} from "@saiticky/common"
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated=Subjects.TicketUpdated;
}

