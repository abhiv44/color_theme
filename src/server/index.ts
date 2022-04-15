import { createConnection } from "./config/config";
import Server from "./server";

const start = async () => {
 const connection = await createConnection();
  const server = new Server();
  await server.run(connection);

};
start().catch((err) => console.log("Server not running",err));