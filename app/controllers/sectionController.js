const { Project, Section } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      if (!req.body.title) {
        req.flash('error', 'Invalid section name');

        return res.redirect(`/app/projects/${req.params.projectId}`);
      }
      const section = await Section.create({ ...req.body, ProjectId: req.params.projectId });

      req.flash('success', `Section ${section.title} successfully created!`);

      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}/edit`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const project = await Project.findOne({
        where: { id: req.params.projectId },
      });

      const sections = await Section.findAll({
        where: { ProjectId: req.params.projectId },
      });

      const activeSection = await Section.findOne({
        where: { id: req.params.id },
      });

      return res.render('./projects/show', {
        user: req.session.user,
        project,
        sections,
        activeSection,
      });
    } catch (err) {
      return next(err);
    }
  },

  async edit(req, res, next) {
    try {
      const project = await Project.findOne({
        where: { id: req.params.projectId },
      });

      const sections = await Section.findAll({
        where: { ProjectId: req.params.projectId },
      });

      const activeSection = await Section.findOne({
        where: { id: req.params.id },
      });

      return res.render('./sections/edit', {
        user: req.session.user,
        project,
        sections,
        activeSection,
      });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const section = await Section.findById(req.params.id);

      await section.update(req.body);

      req.flash('success', 'Section successfully updated!');

      return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Section.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Section successfully deleted!');

      return res.redirect(`/app/projects/${req.params.projectId}/`);
    } catch (err) {
      return next(err);
    }
  },
};
