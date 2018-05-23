const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Invalid project name');

        return res.redirect('/app/dashboard');
      }
      const project = await Project.create({ ...req.body, UserId: req.session.user.id });

      req.flash('success', `Project "${project.title}" successfully created!`);

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
        activeSection: sections[0],
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Project.destroy({ where: { id: req.params.projectId } });

      req.flash('success', 'Project deleted.');

      return res.redirect('/app/dashboard/');
    } catch (err) {
      return next(err);
    }
  },
};
