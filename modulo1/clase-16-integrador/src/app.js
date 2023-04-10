import express, {urlencoded} from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import socket from "./socket.js";
import viewsRouter from './routes/views.router.js';
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const app = express();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const port = process.env.PORT || 8080;

const httpServer = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

socket.connect(httpServer);

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use('/',viewsRouter);

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@codercluster0.ycnamkm.mongodb.net/${dbName}?retryWrites=true&w=majority`)
