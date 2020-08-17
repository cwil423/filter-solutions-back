const express = require('express');
const axios = require('axios');

require('dotenv').config()

const router = express.Router();

router.post('/', (req, res) => {
  const customers = req.body
  const customerAddresses = customers.map(element => element.address.Line1 + ' ' + element.address.City + ' ' + element.address.CountrySubDivisionCode)
  axios({
    method: 'post',
    url: `http://www.mapquestapi.com/directions/v2/optimizedroute?key=${process.env.mapquestKey}`,
    data: {
      "locations": [
        ...customerAddresses
      ]
    }
  }).then(response => res.send(response.data))

  
})

module.exports = router;

