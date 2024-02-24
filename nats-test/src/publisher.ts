import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();
const stan = nats.connect('ticketing', 'abc', {
  url: 'nats://localhost:4222'
});

stan.on('connect', async() => {
  console.log('Publisher connected to NATS');
  
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: '100'
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // // Close the connection after publishing the event
  // });
  const publisher=new TicketCreatedPublisher(stan);
 await publisher.publish({
    id:'123',
    title:'concert',
    price:20
  })
});

stan.on('close', () => {
  console.log('Connection to NATS closed');
});

stan.on('error', (err) => {
  console.error('Error connecting to NATS:', err);
});
