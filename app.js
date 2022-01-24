const express = require('express')

const appRoute = require('./appRouter')

const { response } = require('express')

const app = express()

app.use(express.json())

app.use('', appRoute)

app.listen(5000, () => console.log('app was started'))
