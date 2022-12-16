const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const jwt = require('jsonwebtoken')

router
  .route('/')
  .get(async (req, res) => {
    try {
      if (!req.cookies.token) {
        res.status(400).json({ error: 'No cookie found' });
        return;
      };

      const { user } = jwt.verify(req.cookies.token, 'CS546');
      const { user: existingUser, reports, reviews } = await userData.getUserById(user._id);
      const { _id, fullName, email } = existingUser;

      return res.json({
        user: {
          _id,
          fullName,
          email,
          reports,
          reviews
        }, token: req.cookies.token
      });
    } catch (error) {
      res.clearCookie('token');
      res.status(400).json({ error: error });
    }
  })

module.exports = router;