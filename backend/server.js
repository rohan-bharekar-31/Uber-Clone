import {createServer} from "http"
import app from "./app.js"
import { initSocketServer } from "./socket.js";

const port=process.env.PORT || 3000;

const server=createServer(app);

initSocketServer(server);

server.listen(port,()=>{
    console.log("Server is Live");
})

