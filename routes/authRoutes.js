const express = require('express');
const { ensureAuthenticated } = require('../middlewares/authMiddleware'); 
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController'); 
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register', { csrfToken: req.csrfToken(), error: '' });
});

router.post('/register', authController.register);

router.get('/login', (req, res) => {
  res.render('login', { csrfToken: req.csrfToken(), error: '' }); 
});


router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/profile', ensureAuthenticated, profileController.getProfile);

router.get('/forgot', authController.forgotPasswordPage);
router.post('/forgot', authController.verifySecurityQuestion);
router.post('/reset-password', authController.resetPassword);

module.exports = router;