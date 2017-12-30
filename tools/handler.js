module.exports = {
  mwStatus: (req, res, next) => {
    next()
  },
  toApp: (req, res) => {
    res.sendFile('index.html')
  }
}
