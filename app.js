const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

const app = express();
const oauthRoute = require('./routes/oauth');
const quickbooksApiRoute = require('./routes/quickbooks');
const mapquestApiRoute = require('./routes/mapquest');
const deliveryRoute = require('./routes/delivery');

app.use(cors());
app.use(bodyParser.json());
app.use('/oauth', express.static('public'));

app.use('/oauth', oauthRoute);
app.use('/quickbooks', quickbooksApiRoute);
app.use('/mapquest', mapquestApiRoute);
app.use('/delivery', deliveryRoute);

app.get('/', (req, res) => {
  res.send('home')
})

const port = process.env.Port;

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
});