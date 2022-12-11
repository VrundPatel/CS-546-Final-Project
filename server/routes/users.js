const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const jwt = require('jsonwebtoken')

router
  .route('/auth-check')
  .get(async (req, res) => {

    try {
      if (!req.cookies.token) {
        res.status(400).json({ error: e });
        return;
      };

      const { user } = jwt.verify(req.cookies.token, 'CS546');
      const { _id, fullName, email } = await userData.getUserById(user._id);

      return res.json({
        user: {
          _id,
          fullName,
          email
        }
      });
    } catch (error) {
      res.clearCookie('token');
      res.status(400).json({ error: e });
    }
  })

router
  .route('/')
  .post(async (req, res) => {
    try {
      const { user, token } = await userData.createUser(req.body);
      res
        .cookie('token', token, {
          maxAge: 345600000,
          httpOnly: true,
          sameSite: 'lax',
        })
        .status(200)
        .json({ user });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route('/login')
  .post(async (req, res) => {
    try {
      const { user, token } = await userData.login(req.body);
      res
        .cookie('token', token, {
          maxAge: 345600000,
          httpOnly: true,
          sameSite: 'lax',
        })
        .status(200)
        .json({ user })
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route('/logout')
  .post(async (req, res) => {
    try {
      res.clearCookie('token').status(200).send();
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    try { // Error Checking
      //TODO: ID validation
    } catch (e) {
      return res.status(400).json({ error: e });
    }
    try {
      const user = await userData.getUserById(req.params.userId);
      res.json(user);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //TODO: Updates an existing user with updated fields
    res.send(`POST request to http://localhost:3000/user/${req.params.id}`);
  })

module.exports = router;