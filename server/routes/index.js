const express = require('express');
const router = express.Router();
const config = require('../../config.json');
const request = require('request');

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

router.get('/stream/restart', (req, res, next) => {
  request.post(
    `${config.url}/stream/restart?api_key=${config.apiKey}`,
    (err, response, body) => {
      if (err) {
        console.log(err);
      }
      setTimeout(() => {
        res.redirect('/');
      }, 2000);
    }
  );
});

module.exports = router;
