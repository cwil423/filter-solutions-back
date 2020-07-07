const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');
const QuickBooks = require('node-quickbooks');
const OAuthClient = require('intuit-oauth');
const cookieParser = require('cookie-parser');
const { json, urlencoded } = require('body-parser');
require('dotenv').config()



const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Admin:goenej297@filter-solutions-gqcmf.mongodb.net/filter-solutions?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

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


// app.post('/customer', (req, res) => {
//   axios.get('https://quickbooks.api.intuit.com/v3/company/123146543922004/query?query=select*fromCustomer&minorversion=51')
//     .then(response => console.log(response))
//   .res.send('sent')
// })


// Instance of client
const oauthClient = new OAuthClient({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  environment: 'sandbox',
  redirectUri: process.env.redirectUri,
});

app.get('/oauth', (req, res) => {
  
  // AuthorizationUri
  const authURI = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'testState',
  });
  
  // Redirect the authUri
  res.redirect(authURI);      
})

// app.get('/customer', (req, res) => {
//   axios.get('https://sandbox-quickbooks.api.intuit.com/v3/company/123146543922004/customer/1?minorversion=51')
//     .then(console.log(res.customer))
//     .catch(error => console.log(error))
// })

app.get('/callback', (req, res) => {
  // Parse the redirect URL for authCode and exchange them for tokens
  const parseRedirect = req.url;
 
  // Exchange the auth code retrieved from the **req.url** on the redirectUri
  oauthClient
    .createToken(parseRedirect)
    .then(function (authResponse) {
      res.cookie('secondcookie', authResponse.token.access_token);
      res.send('cookies plz')
      console.log('The Token is  ' + JSON.stringify(authResponse.getJson()));
    })
    .catch(function (e) {
      console.error('The error message is :' + e.originalMessage);
      console.error(e.intuit_tid);
    });
  
})

app.get('/', (req, res) => {
  res.send('home')
})

app.post('/apiCall', (req, res) => {
  const query = encodeURIComponent('select * from Customer');
  axios({
    method: 'get',
    url: `https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365064691660/query?query=${query}&minorversion=51`,
    headers: {
      Authorization: `Bearer ${req.body.token}`
    }
    // method: 'get',
    // url: 'https://sandbox-accounts.platform.intuit.com/v1/openid_connect/userinfo',
    // headers: {
    //   Authorization: 'Bearer' + ' ' + req.body.token
    // }
  }).then(response => (res.send(response.data.QueryResponse))).catch(err => console.log(err))
  // res.send(req.body)
  // console.log(req.body)
  })
  
  










const port = process.env.port;

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
});