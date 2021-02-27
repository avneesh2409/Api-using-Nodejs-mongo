require('dotenv').config();
const app = require('./server');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require(`./database/connection`);

const apiRouter = require('./route');

app.use('/api',apiRouter);