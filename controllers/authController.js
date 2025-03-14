const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const db = require('../config/db');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, (err, user) => {
    if (err || !user) {
      return res.render('login', { csrfToken: req.csrfToken(), error: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.render('login', { csrfToken: req.csrfToken(), error: 'Invalid credentials' });
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      phone: user.phone,
    };

    req.session.userId = user.id;

    req.session.save((err) => {
      if (err) {
        return res.render('login', { csrfToken: req.csrfToken(), error: 'Session not saved' });
      }
      res.redirect('/');
    });
  });
};

exports.register = (req, res) => {
  const { name, phone, email, password, gender, location, dob } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  userModel.getUserByEmail(email, (err, existingUser) => {
    if (existingUser) {
      return res.render('register', { csrfToken: req.csrfToken(), error: 'Email already exists' });
    }

    userModel.registerUser(name, phone, email, hashedPassword, gender, location, dob, (err) => {
      if (err) {
        return res.render('register', { csrfToken: req.csrfToken(), error: 'Registration failed' });
      }
      res.redirect('/login');
    });
  });
};

exports.getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      callback(null, results[0]); 
    } else {
      callback(null, null); 
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.forgotPasswordPage = (req, res) => {
  res.render('forgot', { csrfToken: req.csrfToken() });
};

exports.verifySecurityQuestion = (req, res) => {
  const { email, phone } = req.body;
  
  userModel.verifySecurityAnswer(email, phone, (err, isMatch) => {
    if (err) return res.status(500).send('Server error');
    if (!isMatch) return res.status(400).send('Incorrect email or phone');

    res.render('resetPassword', { email, csrfToken: req.csrfToken() });
  });
};

exports.resetPassword = (req, res) => {
  const { email, newPassword } = req.body;
  
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    userModel.updatePassword(email, hashedPassword, (err) => {
      if (err) return res.status(500).send('Failed to update password');
      res.send('<script>alert("Password reset successful!"); window.location.href="/login";</script>');
    });
  });
};