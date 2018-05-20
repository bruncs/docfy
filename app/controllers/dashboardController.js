const { Project } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        where: { UserId: req.session.user.id },
      });

      return res.render('dashboard/index', {
        user: req.session.user,
        projects,
      });
    } catch (err) {
      return next(err);
    }
  },
};
