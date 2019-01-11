module.exports = function(req, res, next) {
  if (req.user && req.user.admin) {
    next();
  } else {
    // res.flash('error', 'Please log in to view this page');
    res.redirect('/');
  }
};
