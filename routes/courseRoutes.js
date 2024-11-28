const express = require('express');
const { renderCoursesPage } = require('../controllers/courseController'); 
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.get('/courses', ensureAuthenticated, renderCoursesPage);

module.exports = router;