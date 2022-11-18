const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

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
      res.json(userFound);
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