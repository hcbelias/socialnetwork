'use strict';

var _ = require('lodash');
var Friend = require('./friend.model');

// Get list of friends
exports.index = function(req, res) {
  Friend.find(function (err, friends) {
    if(err) { return handleError(res, err); }
    return res.json(200, friends);
  });
};

// Get a single friend
exports.show = function(req, res) {
  Friend.findById(req.params.id, function (err, friend) {
    if(err) { return handleError(res, err); }
    if(!friend) { return res.send(404); }
    return res.json(friend);
  });
};

// Creates a new friend in the DB.
exports.create = function(req, res) {
  Friend.create(req.body, function(err, friend) {
    if(err) { return handleError(res, err); }
    return res.json(201, friend);
  });
};

// Updates an existing friend in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Friend.findById(req.params.id, function (err, friend) {
    if (err) { return handleError(res, err); }
    if(!friend) { return res.send(404); }
    var updated = _.merge(friend, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, friend);
    });
  });
};

// Deletes a friend from the DB.
exports.destroy = function(req, res) {
  Friend.findById(req.params.id, function (err, friend) {
    if(err) { return handleError(res, err); }
    if(!friend) { return res.send(404); }
    friend.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}