import {Publisher,Subjects,TicketCreatedEvent} from "@saiticky/common"

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject:Subjects.TicketCreated=Subjects.TicketCreated; 
}