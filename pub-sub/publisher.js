const amqp = require("amqplib");

const message = {
  number: process.argv[2] || Math.floor(Math.random() * 10), // Use CLI input or random number
};

// Connect to RabbitMQ and send a message
async function connect() {
  try {
    // Connect to RabbitMQ server
    const amqpServer = "amqp://user:password@localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    // Ensure the 'jobs' queue exists
    await channel.assertQueue("jobs");

    // Send the message to the 'jobs' queue
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
    console.log(`Job sent successfully with input: ${message.number}`);

    // Close channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error(`Error in publisher: ${error.message}`);
    process.exit(1); // Exit process on error
  }
}

// Run the publisher
connect();
