module.exports = (req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  req.flash('error', 'Access denied.');
  return res.redirect('/app/dashboard');
};
