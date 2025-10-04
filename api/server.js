import jsonServer from "json-server";
import path from "path";

const router = jsonServer.router(path.join(process.cwd(), "data/db.json"));
const middlewares = jsonServer.defaults();

export default function handler(req, res) {
  const server = jsonServer.create();
  server.use(middlewares);
  server.use(router);

  server(req, res);
}
