import express from "express"
import amqp, { Channel, Connection } from "amqplib";
const app = express();
const PORT = 3002;

let channel: Channel;
let connection: Connection;

app.use(express.json());

// async function connect() {
//     const amqpServer = 'amqp://rabbitmq';
//     const connection = await amqp.connect(amqpServer);
//     channel = await connection.createChannel();
//     await channel.assertQueue("PRODUCT");
// }
// connect();
const queueName = 'my_queue';
const message = 'Hello, RabbitMQ!';

async function sendMessage() {
    try {

        connection = await amqp.connect('amqp://rabbitmq');
        channel = await connection.createChannel();
        console.log("***********************XChannel Created", channel)
        await channel.assertQueue(queueName);
    } catch (err) {
        console.log('eroorrr*****************', err)//172.24.0.3:5672
        setTimeout(sendMessage, 6000)
    }
}
sendMessage()


app.get("/product/buy", async (req, res) => {
    // channel.sendToQueue(
    //     "ORDER",
    //     Buffer.from(
    //         JSON.stringify({
    //             userEmail: "joshi@gmail.com",
    //         })
    //     )
    // );
    await channel.sendToQueue(queueName, Buffer.from(message));
    console.log('Message sent:', message);
    res.send("done")
});

// testing route
app.get("/product", (_req, res) => {
    res.send(`Server is running on port: ${PORT}`);
});



app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});