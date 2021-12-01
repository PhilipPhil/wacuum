const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Url = require('../models/url');

const urlRouter = express.Router();

urlRouter.use(bodyParser.json());

urlRouter.route('/')
    // .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get((req, res, next) => {
        Url.create(req.body)
        .then((deals) => {
            console.log('Deal Created ', deals);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(deals);
        }, (err) => next(err))
        .catch((err) => next(err));


    })

module.exports = urlRouter;