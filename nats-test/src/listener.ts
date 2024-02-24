import nats from "node-nats-streaming";

import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";
console.clear();
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("listener connected to nats");

  stan.on("close", () => {
    console.log("NATS Connection closed!");
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});



// ! FOR REMOVING FROM QUEUE
process.on("SIGINT", () => {
  stan.close();
});

process.on("SIGTERM", () => {
  stan.close();
});
// !||||||||||||||||||||||||||||| 