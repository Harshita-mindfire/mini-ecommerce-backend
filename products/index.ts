import express from "express"
const app = express();
const PORT = 3002
const amqp = require("amqplib");

let channel: any;
let connection: any;

app.use(express.json());

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
}
connect();

app.post("/product/buy", async (req, res) => {
    channel.sendToQueue(
        "ORDER",
        Buffer.from(
            JSON.stringify({
                userEmail: "joshi@gmail.com",
            })
        )
    );
});



app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});