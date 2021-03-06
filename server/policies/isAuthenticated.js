const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    // returns user information if token is valid
    if (err || !user) {
      let error = {}
      if (info.name === 'TokenExpiredError') {
        error.error = 'Session ended. Redirecting to login.'
        error.title = 'Pardon the interruption.'
        error.redirect = true
      } else {
        error.error = 'Access denied.'
        error.redirect = false
        error.title = 'You no take candle.'
      }

      res.status(403).send(error)
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
