import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "data/db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default server;
