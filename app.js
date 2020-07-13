const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config()

const app = express();
const oauthRoute = require('./routes/oauth');
const quickbooksApiRoute = require('./routes/quickbooks');
const mapquestApiRoute = require('./routes/mapquest');

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.use('/oauth', oauthRoute);
app.use('/quickbooks', quickbooksApiRoute);
app.use('/mapquest', mapquestApiRoute)

app.get('/', (req, res) => {
  res.send('home')
})


// Connect to MongoDB
// mongoose.connect(process.env.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Set up schema and model for MongoDB
const deliverySchema = new mongoose.Schema({
  name: String,
  address: String
});
const userSchema = new mongoose.Schema({
  token: JSON
})
const Login = mongoose.model('Login', userSchema)

// const Delivery = mongoose.model('delivery', deliverySchema, 'deliveries');
// app.post('/', (req, res) => {
//   // axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.API_KEY}&location=${req.body.lat},${req.body.lng}`)
//   //   .then((response) => console.log(response))
//   axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.lat},${req.body.lng}&key=${process.env.API_KEY}`)
//   .then((res) => console.log(res.data.results));
//   // const delivery = new Delivery({
//   //   name: req.body.name,
//   //   adress: req.body.location
//   // })
//   // delivery.save(err => console.log(err));
//   res.send(req.body)
// });


const port = process.env.port;

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
});