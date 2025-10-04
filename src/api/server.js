import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();

// Абсолютный путь к db.json
const __dirname = path.resolve(); // корень проекта на Vercel
const router = jsonServer.router(path.join(__dirname, "data/db.json"));

const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);

export default server;
