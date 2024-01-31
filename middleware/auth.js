//ensureAuth function checks to see if user is authenticated, if not, redirects to root
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  // ensureGuest: function (req, res, next) {
  //   if (!req.isAuthenticated()) {
  //     return next();
  //   } else {
  //     res.redirect("/dashboard");
  //   }
  // },
}