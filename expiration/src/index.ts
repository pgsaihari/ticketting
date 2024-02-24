
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listenr";
const start = async () => {
  
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS CLUSTER");
  }
  // TODO removed nats client from ENV variables Section 17 last video
  // if (!process.env.NATS_CLIENT_ID) {
  //   throw new Error("NATS.client");
  // }

  await natsWrapper.connect(
    process.env.NATS_CLUSTER_ID,
    "pineapple",
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
 
  
};

start();
