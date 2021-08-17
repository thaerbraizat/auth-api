'use strict';
require('dotenv').config();
const userModel = require('./users.js');
const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = "postgres://localhost:5432/thaerbraizat" ;
// const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory;';
// postgres://localhost:5432/thaerbraizat
const sequelize = new Sequelize(DATABASE_URL);

module.exports = {
  db: sequelize,
  users: userModel(sequelize, DataTypes),
}
