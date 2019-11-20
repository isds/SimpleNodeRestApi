const express = require('express');
const router = express.Router();
const SubscriberModel = require('../models/subscribers')

router.get('/', async (request, response) => {
  try {
    const subscribers = await SubscriberModel.find();
    response.json(subscribers);
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
});

router.get('/:id', async (request, response) => {
  const subscriber = await getSubscriber(request);
  response.status(200).json(subscriber);
});

router.post('/', async (request, response) => {
  const subscriber = new SubscriberModel({
    name: request.body.name,
    subscribedToChannel: request.body.subscribedToChannel
  });

  try {
    const newSubscriber = await subscriber.save();
    response.status(201).json(newSubscriber);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

router.patch('/', (request, response) => {

});

router.delete('/:id', (request, response) => {

});

async function getSubscriber(request) {
  try {
    const subscriber = await SubscriberModel.findById(request.params.id);
    return subscriber;
  } catch (error) {
    return response.status(404).json({message: 'Cannot find subscriber'});
  }
}

module.exports = router;