const express = require('express') // get express module
const app = express() // create app by running express as function
const port = 80 // give it a port

const hand = require('./tools/handler.js') // pull in the handler
const path = require('path') // pull in the path module
app.use(express.static(path.join(__dirname, '/dist'))) // set root to project root directory + /dist
app.use('*', hand.mwStatus) // every possible route goes through here
app.get('/', hand.toApp) // get requests to the root go here
app.get('/mock', hand.mockJson) // get requests to /mock go here, it returns a json object, it was just for testing
app.get('/node_modules/*', hand.nodePassthrough) // this allows the src/href calls from the index.html file to reach the root/node_modules/ directories
app.listen(port, () => console.log(`listening on port: ${port}`)) // starts the server and listens on the port you supplied
