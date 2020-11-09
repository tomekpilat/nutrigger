const { Connection, Request } = require("tedious");


module.exports = async function (context, req) {
      const config = {
        authentication: {
          options: {
            userName: process.env["DATABASE_USER"],
            password: process.env["DATABASE_PASSWORD"]
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
      try {
      connection.on("connect", err => {
        if (err) {
          console.error(err.message);
        } else {
          insertDatabase();
        }
      });

      function insertDatabase() {
        const request = new Request(
          `INSERT INTO Test (NuType, Payload) VALUES ('test1', 'test2')`,
          (err, rowCount) => {
            if (err) {
              console.error(err.message);
            } else {
              console.log(`${rowCount} row(s) returned`);
            }
          }
        );

        request.on("row", columns => {
          columns.forEach(column => {
            console.log("%s\t%s", column.metadata.colName, column.value);
          });
        });

        connection.execSql(request);
      }
    } catch (e) {
      context.res = {
          body: {
              text: "Hello from the API",
              error: JSON.stringify(e);
          }
      };
      
    }
}