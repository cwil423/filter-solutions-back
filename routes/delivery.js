const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Set up schema and model for MongoDB
const deliverySchema = new mongoose.Schema({
  name: String,
  address: String,
  date: {type: Date, default: Date.now}
});

const Delivery = mongoose.model('delivery', deliverySchema, 'deliveries');

router.post('/', (req, res) => {
  const delivery = new Delivery({
    name: req.body.name,
    address: req.body.address,
  });
  delivery.save(err => console.log(err));
  res.send(req.body)
});


module.exports = router