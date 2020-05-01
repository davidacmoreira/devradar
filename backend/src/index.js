const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');
const fs = require('fs');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

const config_object = fs.readFileSync('./config.json');
const content_config = JSON.parse(config_object);

const uri_mongodb = 'mongodb://' + content_config.URI_MONGODB;

mongoose.connect(uri_mongodb, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);
mongoose.set('useFindAndModify', false);

server.listen(content_config.PORT_BACKEND);
