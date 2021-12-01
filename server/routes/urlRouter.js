const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const url = require('../models/url');

const urlRouter = express.Router();

urlRouter.use(bodyParser.json());

urlRouter.route('/')
    // .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get((req, res, next) => {
        // If not in DB create url
        // return url
    })

module.exports = urlRouter;