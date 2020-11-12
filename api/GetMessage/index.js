const { Connection, Request } = require("tedious");
const { EventHubProducerClient } = require("@azure/event-hubs");

module.exports = async function (context, req) {
      // Create connection to database
      const config = {
        authentication: {
          options: {
            userName: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD
          },
          type: "default"
        },
        server: "nupoc.database.windows.net", 
        options: {
          database: "nupoc",
          encrypt: true
        }
      };

      const connection = new Connection(config);
      connection.on("connect", err => {
        if (err) {
          console.error(err.message);
        } else {
          const request = new Request(
            `INSERT INTO Test (NuType, Payload) VALUES (${req.body}, 'test2')`,
            (err, rowCount) => {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`${rowCount} row(s) returned`);
              }
            }
          );
  
          connection.execSql(request);
        }
      });

      // Create a producer client to send messages to the event hub.
      const producer = new EventHubProducerClient(process.env.HUB_CONNECTION, process.env.HUB_NAME);

      // Prepare a batch of three events.
      const batch = await producer.createBatch();
      batch.tryAdd({ body: req.body });

      // Send the batch to the event hub.
      await producer.sendBatch(batch);
      // Close the producer client.
      await producer.close();

      
    context.res = {
        body: {
            text: "Hello from the API"
        }
    };
}