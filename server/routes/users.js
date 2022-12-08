const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router
  .route('/auth-check')
  .get(async (req, res) => {
    console.log('check auth state');
    if (req.session.user) res.json({ user: req.session.user })
    else res.status(401).json({ error: 'User not in session' })
  })

router
  .route('/')
  .post(async (req, res) => {
    try {
      const userCreated = await userData.createUser(req.body);
      res.json({ created: true });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route('/login')
  .post(async (req, res) => {
    try {
      const userFound = await userData.getUserByEmail(req.body.email);
      const { email } = userFound;
      req.session.user = email;
      console.log('req session ', req.session.user);
      res.json(userFound);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router
  .route('/logout')
  .post(async (req, res) => {
    try {
      req.session.destroy();
      res.json('User logged out');
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