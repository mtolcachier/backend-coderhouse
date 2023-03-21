import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";

const socket = {};

socket.connect = (httpServer) => {
    socket.io = new Server(httpServer);

    let { io } = socket;

    io.on("connection", async (socket) => {
        console.log(`${socket.id} connected`);
        const productManager = new ProductManager();

        io.emit('products', await productManager.getProducts())

        socket.on('message', data => {
            console.log(data)
        })
    });
};

export default socket;