const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

// router
//   .route('/auth-check')
//   .get(async (req, res) => {
//     console.log('check auth state');
//     if (req.session.user) res.json({ user: req.session.user })
//     else res.status(401).json({ error: 'User not in session' })
//   })

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