const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors');

const Deals2 = require('../models/deals2');

const deal2Router = express.Router();

deal2Router.use(bodyParser.json());

deal2Router.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Deals2.find(req.query)
            .then((deal2) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(deal2);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Deals2.create(req.body)
            .then((deal2) => {
                console.log('Deal Created ', deal2);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(deal2);
            }, (err) => next(err))
            .catch((err) => next(err));
    })


module.exports = deal2Router;