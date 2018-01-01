const express = require('express')
const app = express()
const port = 80

const hand = require('./tools/handler.js')
const path = require('path')
app.use(express.static(path.join(__dirname, '/dist')))
app.use('*', hand.mwStatus)
app.get('/', hand.toApp)
app.get('/mock', hand.mockJson)
app.get('/node_modules/*', hand.nodePassthrough)
app.listen(port, () => console.log(`listening on port: ${port}`))
