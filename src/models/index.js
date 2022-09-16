const arg = require('arg')
const Sequelize = require('sequelize')
const config = require('../config')
const userModel = require('./User')

const MOCK = arg({ "--mock": Boolean })["--mock"]
const { database, user, password, options } = MOCK ? config.db.local : config.db.default
const sequelize = new Sequelize(database, user, password, options)

const models = {
  User: userModel(sequelize, Sequelize.DataTypes)
}

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
