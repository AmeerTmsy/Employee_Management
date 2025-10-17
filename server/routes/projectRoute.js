const express = require('express');
const { getProjects, getProjectsById, createNewProject, updateProject, deleteProject, getProjectsCount } = require('../controllers/projectController');
const router = express.Router();

router.get('/count', getProjectsCount);
router.get('/', getProjects);
router.get('/:id', getProjectsById);
router.post('/', createNewProject);
router.patch('/:id', updateProject);
router.get('/delete/:id', deleteProject);

module.exports = router 