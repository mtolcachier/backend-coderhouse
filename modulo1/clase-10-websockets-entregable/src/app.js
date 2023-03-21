import express, {urlencoded} from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import socket from "./socket.js";
import viewsRouter from './routes/views.router.js'

const app = express();

const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080");
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
app.use('/',viewsRouter)
