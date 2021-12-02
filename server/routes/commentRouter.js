const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Comments = require('../models/comments');
const Url = require('../models/url');

const commentRouter = express.Router();

commentRouter.use(bodyParser.json());

commentRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /comments');
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        if (!req.body || req.body.comment == null || req.body.url_id == null || req.body.like == null) {
            err = new Error('Malformed request');
            err.status = 400;
            return next(err);
        } else {
            var newComment = {
                author: req.user._id,
                comment: req.body.comment,
                url: mongoose.Types.ObjectId(req.body.url_id),
                like: req.body.like,
            }
            Url.findById(newComment.url)
                .then((url) => {
                    Comments.create(newComment)
                        .then((comment) => {
                            url.comments.push(comment)
                            Url.findByIdAndUpdate(url._id, { $set: url }, { new: true })
                                .then((url) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(comment);
                                }, (err) => next(err))
                                .catch((err) => next(err));
                        }, (err) => next(err))
                        .catch((err) => next(err));

                }, (err) => next(err))
                .catch((err) => next(err));
        }
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        // update comment
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        // removes specific comment with id
        // remove comment from url
    });

// commentRouter.route('/')
//     // .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
//     .get((req, res, next) => {
//         Comments.find(req.query).sort({"updatedAt":-1})
//             .populate('author')
//             .then((comments) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(comments);
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .post(authenticate.verifyUser, (req, res, next) => {
//         if (req.body != null) {
//             req.body.author = req.user._id;
//             Comments.create(req.body)
//                 .then((comment) => {
//                     Comments.findById(comment._id)
//                         .populate('author')
//                         .then((comment) => {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(comment);
//                         })
//                 }, (err) => next(err))
//                 .catch((err) => next(err));
//         } else {
//             err = new Error('comment not found');
//             err.status = 404;
//             return next(err);
//         }
//     })
//     .put(authenticate.verifyUser, (req, res, next) => {
//         res.statusCode = 403;
//         res.end('PUT operation not supported on /comments');
//     })
//     .delete(authenticate.verifyUser, (req, res, next) => {
//         Comments.remove({})
//             .then((resp) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(resp);
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     });

// commentRouter.route('/:commentId')
//     // .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
//     .get(cors.cors, (req, res, next) => {
//         Comments.findById(req.params.commentId)
//             .then((comment) => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(comment);
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .post(authenticate.verifyUser, (req, res, next) => {
//         res.statusCode = 403;
//         res.end('POST operation not supported on /comments/' + req.params.commentId);
//     })
//     .put(authenticate.verifyUser, (req, res, next) => {
//         Comments.findById(req.params.commentId)
//             .then((comment) => {
//                 if (comment != null) {
//                     if (!comment.author.equals(req.user._id)) {
//                         var err = new Error('Not authorized to update this comment');
//                         err.status = 403;
//                         return next(err);
//                     }
//                     req.body.author = req.user._id;
//                     Comments.findByIdAndUpdate(req.params.commentId, {
//                         $set: req.body
//                     }, { new: true })
//                         .then((comment) => {
//                             Comments.findById(comment._id)
//                                 .populate('author')
//                                 .then((comment) => {
//                                     res.statusCode = 200;
//                                     res.setHeader('Content-Type', 'application/json');
//                                     res.json(comment);
//                                 })
//                         }, (err) => next(err));
//                 }
//                 else {
//                     err = new Error('comment ' + req.params.commentId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .delete(authenticate.verifyUser, (req, res, next) => {
//         Comments.findById(req.params.commentId)
//             .then((comment) => {
//                 if (comment != null) {
//                     if (!comment.author.equals(req.user._id)) {
//                         var err = new Error('Not authorized to delete this comment');
//                         err.status = 403;
//                         return next(err);
//                     }
//                     Comments.findByIdAndRemove(req.params.commentId)
//                         .then((resp) => {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(resp);
//                         }, (err) => next(err))
//                         .catch((err) => next(err));
//                 }
//                 else {
//                     err = new Error('comment ' + req.params.commentId + ' not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     });

module.exports = commentRouter;