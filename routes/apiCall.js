const express = require('express');
const axios = require('axios');

const router = express.Router();


router.post('/', (req, res) => {
  const query = encodeURIComponent('select * from Customer');
  axios({
    method: 'get',
    url: `https://sandbox-quickbooks.api.intuit.com/v3/company/4620816365064691660/query?query=${query}&minorversion=51`,
    headers: {
      Authorization: `Bearer ${req.body.token}`
    }
  }).then(response => (res.send(response.data.QueryResponse))).catch(err => console.log(err))})

module.exports = router;