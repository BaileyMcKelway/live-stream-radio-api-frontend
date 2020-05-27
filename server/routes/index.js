const express = require('express');
const router = express.Router();
const config = require('../../config.json');
const request = require('request');

// Gets status of radio
router.get('/', (req, res, next) => {
  console.log(`${config.url}/stream/?api_key=${config.apiKey}`);
  request.get(
    `${config.url}/stream?api_key=${config.apiKey}`,
    (err, response, body) => {
      if (err) {
        console.log(err);
      }
      res.send(body);
    }
  );
});

// Gets list of songs loaded into library
router.get('/library', (req, res, next) => {
  console.log(`${config.url}/library/audio?api_key=${config.apiKey}`);
  request.get(
    `${config.url}/library/audio?api_key=${config.apiKey}`,
    (err, response, body) => {
      if (err) {
        console.log(err);
      }
      res.send(body);
    }
  );
});

router.get('/config', (req, res, next) => {
  request.get(
    `${config.url}/config?api_key=${config.apiKey}`,
    (err, response, body) => {
      if (err) {
        console.log(err);
      }
      res.send(body);
    }
  );
});

// Starts stream
router.get('/stream/start', (req, res, next) => {
  request.post(
    `${config.url}/stream/start?api_key=${config.apiKey}`,
    (err, response, body) => {
      if (err) {
        console.log(err);
      }

      res.redirect('/');
    }
  );
});

// Stops stream
router.get('/stream/stop', (req, res, next) => {
  request.post(
    `${config.url}/stream/stop?api_key=${config.apiKey}`,
    (err, response, body) => {
      if (err) {
        console.log(err);
      }
      res.redirect('/');
    }
  );
});

module.exports = router;
