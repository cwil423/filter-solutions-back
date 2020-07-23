const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()

const app = express();
const oauthRoute = require('./routes/oauth');
const quickbooksApiRoute = require('./routes/quickbooks');
const mapquestApiRoute = require('./routes/mapquest');
const mongoDbRoute = require('./routes/mongoDb');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use('/oauth', express.static('public'));

app.use('/oauth', oauthRoute);
app.use('/quickbooks', quickbooksApiRoute);
app.use('/mapquest', mapquestApiRoute)
app.use('/mongoDb', mongoDbRoute);

app.get('/', (req, res) => {
  res.send('home')
})

const port = process.env.port;

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
});