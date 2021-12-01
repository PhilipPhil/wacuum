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
        if(!req.body.urlname) {
            err = new Error('No url found');
            err.status = 404;
            return next(err);
        } else {
            var requestUrlName = {urlname : req.body.urlname}
            Url.findOne(requestUrlName)
            .then((url) => {
                if (url == null) { 
                    Url.create(requestUrlName)
                    .then((url) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(url);
                    }, (err) => next(err))
                    .catch((err) => next(err));
                } else {
                    // we will need to populate this with author and comments also
                    Url.find(requestUrlName) 
                    .then((url) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(url);
                    }, (err) => next(err))
                    .catch((err) => next(err));
                }
            }, (err) => next(err))
            .catch((err) => next(err));
        }
    })

module.exports = urlRouter;