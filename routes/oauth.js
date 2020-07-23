const express = require('express');
const OAuthClient = require('intuit-oauth');
const path = require('path')

const router = express.Router();

// Instance of client
const oauthClient = new OAuthClient({
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  environment: 'sandbox',
  redirectUri: process.env.redirectUri,
});

router.get('/', (req, res) => {
  
  // AuthorizationUri
  const authURI = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'testState',
  });
  
  // Redirect the authUri
  res.redirect(authURI);      
})

router.get('/callback', (req, res) => {
  const dirPath = path.join(__dirname, '../index.html')

  // Parse the redirect URL for authCode and exchange them for tokens
  const parseRedirect = req.url;
 
  // Exchange the auth code retrieved from the **req.url** on the redirectUri
  oauthClient
    .createToken(parseRedirect)
    .then(function (authResponse) {
      // res.header('Access-Control-Allow-Origin', '*')
      res.cookie('secondcookie', authResponse.token.access_token);
      res.sendFile(dirPath)
      console.log('The Token is  ' + JSON.stringify(authResponse.getJson()));
    })
    .catch(function (e) {
      console.error('The error message is :' + e.originalMessage);
      console.error(e.intuit_tid);
    });
  
})

module.exports = router;