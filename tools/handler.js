const path = require('path')
module.exports = {
  mwStatus: (req, res, next) => {
    next()
  },
  toApp: (req, res) => {
    res.sendFile('index.html')
  },
  mockJson: (req, res) => { res.json({test: 'success'}) },
  nodePassthrough: (req, res) => { res.sendFile(path.join(__dirname, req.path)) }
}
