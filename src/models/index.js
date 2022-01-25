const Sequelize = require('sequelize')
const config = require('../config')
const userModel = require('./User')

const { database, user, password, options } = process.env.MOCK === 'true' ? config.db.local : config.db.default
const sequelize = new Sequelize(database, user, password, options)

const models = {
  User: userModel(sequelize, Sequelize.DataTypes)
}

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
