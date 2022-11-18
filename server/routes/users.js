const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router
  .route('/')
  .get(async (req, res) => {
    const userList = await userData.getAllUsers();
    res.json(userList);
  })
  .post(async (req, res) => {
    // Creates a new user account
    console.log('incoming request ', req.body);
    const userCreated = await userData.createUser(req.body);
    res.json({ created: true });
  })
  .delete(async (req, res) => {
    // Deletes a user account. Probably not needed for the project?
    res.send('DELETE request to http://localhost:3000/user');
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