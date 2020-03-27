import express from 'express';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import routes from './routes';
import { setupWebsocket } from './websocket';

const app = express();

const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack10:omnistack10@omnistack10-dvtr8.mongodb.net/omni10?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());

app.use(express.json());

app.use(routes);

server.listen(3333);
