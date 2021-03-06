const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { sequelize } = require('./models')

const config = require('./config')

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())
app.options('*', cors())

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/api.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('./passport')
require('./routes')(app)

sequelize.sync({ force: false })
  .then(() => {
    app.listen(config.port, (err) => {
      if (err) {
        console.log(`Failed to start server at port ${config.port}`)
      } else {
        console.log(`Server started at port ${config.port}`)
      }
    })
  }).catch((err) => {
    console.log(`Failed to connect to PgSQL server ${err}`)
    console.log(err)
  })
