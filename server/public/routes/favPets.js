var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var Pet = require('../models/petschema');
var path = require('path');

router.get('/', function (req, res) {
  Pet.find({}, function (err, pets) {
    if (err) {
      res.sendStatus(500);
      return;
    }
res.send(pets);
});
});
router.post('/', function (req, res) {
  var pet = new Pet(req.body);
  pet.save(function (err) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    res.sendStatus(201);
  });
});

module.exports = router;
