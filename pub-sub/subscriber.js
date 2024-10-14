const amqp = require("amqplib");

// Connect to RabbitMQ and consume messages
async function connect() {
  try {
    // Connect to RabbitMQ server
    const amqpServer = "amqp://user:password@localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    // Ensure the 'jobs' queue exists
    await channel.assertQueue("jobs");

    console.log("Waiting for messages from 'jobs' queue...");

    // Consume messages from the 'jobs' queue
    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Received job with input: ${input.number}`);

      // Acknowledge the message if it meets the condition
      if (input.number === 7 || input.number === '7') {
        channel.ack(message); // Acknowledge that the message has been processed
        console.log(`Acknowledged job with input: ${input.number}`);
      } else {
        console.log(`Job with input: ${input.number} not acknowledged`);
      }
    });
  } catch (error) {
    console.error(`Error in subscriber: ${error.message}`);
    process.exit(1); // Exit process on error
  }
}

// Run the subscriber
connect();
