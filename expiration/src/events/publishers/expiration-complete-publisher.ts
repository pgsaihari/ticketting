import { Subjects,Publisher,ExpirationComplete } from "@saiticky/common";
export class ExpirationCompletePublisher extends Publisher<ExpirationComplete>{
    subject: Subjects.ExpirationComplete=Subjects.ExpirationComplete
}