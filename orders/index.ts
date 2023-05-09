import express from "express";
import amqp, { Channel } from "amqplib";
const app = express();
const PORT = 3001

app.use(express.json());

let channel: Channel

async function connect() {
    const amqpServer = 'amqp://rabbitmq';
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
}
connect().then(() => {
    channel.consume("ORDER", (data: any) => {
        console.log("Consuming ORDER service", data);
        channel.ack(data);
    });
});

app.get("/order", (_req, res) => {
    res.send(`Server is running on port: ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});
