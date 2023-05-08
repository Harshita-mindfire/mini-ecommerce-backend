import express from "express"
const app = express();
const PORT = 3001
const amqp = require("amqplib");

let channel: any;
let connection: any;
app.use(express.json());


async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
}
connect().then(() => {
    channel.consume("ORDER", (data: any) => {
        console.log("Consuming ORDER service", data);
        channel.ack(data);
    });
});

app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});