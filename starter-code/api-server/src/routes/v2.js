'use strict';

const express = require('express');
const dataModules = require('../models');

const basicAuth = require('../auth/middleware/basic')
const bearerAuth = require('../auth/middleware/bearer')
const permissions = require('../auth/middleware/acl')

const testRouter = express.Router();

testRouter.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

testRouter.get('/:model',bearerAuth, handleGetAll);
testRouter.get('/:model/:id',bearerAuth, handleGetOne);
testRouter.post('/:model',bearerAuth,permissions('create'), handleCreate);
testRouter.put('/:model/:id',bearerAuth,permissions('update'), handleUpdate);
testRouter.delete('/:model/:id',bearerAuth,permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = testRouter;
