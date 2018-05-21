const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const projects = await Project.create({ ...req.body, UserId: req.session.user.id });

      req.flash('success', `Project "${projects.title}" successfully created!`);

      return res.redirect('/app/dashboard');
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const project = await Project.findOne({
        where: { id: req.params.id },
      });

      const sections = await Section.findAll({
        where: { ProjectId: req.params.id },
      });

      return res.render('./projects/show', {
        user: req.session.user,
        project,
        sections,
      });
    } catch (err) {
      return next(err);
    }
  },
};
