import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listener/order-created-listener";
import { OrderCancelledListener } from "./events/listener/order-cancelled-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("error in token generation");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("error in token generation");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS CLUSTER");
  }
  // TODO removed nats client from ENV variables Section 17 last video
  // if (!process.env.NATS_CLIENT_ID) {
  //   throw new Error("NATS.client");
  // }

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    "paymentService",
    process.env.NATS_URL!
  );
  natsWrapper.client.on("close", () => {
    console.log("NATS Connection closed!");
    process.exit();
  });
  process.on("SIGINT", () => {
    natsWrapper.client.close();
  });

  process.on("SIGTERM", () => {
    natsWrapper.client.close();
  });

    new OrderCreatedListener(natsWrapper.client).listen()
    new OrderCancelledListener(natsWrapper.client).listen()
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((err) => {
      console.log(err);
    });

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!");
  });
};

start();
