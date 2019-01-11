module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.flash('error', 'Please log in to view this page');
    res.redirect('/auth/login');
  }
};
res.flash('error', 'Please log in to view this page');
