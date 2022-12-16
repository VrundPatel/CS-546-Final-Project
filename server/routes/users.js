const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const jwt = require("jsonwebtoken");

router.route("/auth-check").get(async (req, res) => {
  try {
    if (!req.cookies.token) {
      res.status(400).json({ error: e });
      return;
    }

    const { user } = jwt.verify(req.cookies.token, "CS546");
    const { _id, fullName, email } = await userData.getUserById(user._id);

    return res.json({
      user: {
        _id,
        fullName,
        email,
      },
      token: req.cookies.token,
    });
  } catch (error) {
    res.clearCookie("token");
    res.status(400).json({ error: e });
  }
});

router
  .route("/")
  .get(async (req, res) => {
    try {
      if (!req.cookies.token) {
        res.status(400).json({ error: "No cookie found" });
        return;
      }

      const { user } = jwt.verify(req.cookies.token, "CS546");
      const {
        user: existingUser,
        reports,
        reviews,
      } = await userData.getUserById(user._id);
      const { _id, fullName, email } = userData;

      return res.json({
        user: {
          _id,
          fullName,
          email,
          reports,
          reviews,
        },
        token: req.cookies.token,
      });
    } catch (error) {
      res.clearCookie("token");
      res.status(400).json({ error: error });
    }
  })
  .post(async (req, res) => {
    try {
      const { user, token } = await userData.createUser(req.body);
      res
        .cookie("token", token, {
          maxAge: 345600000,
          httpOnly: true,
          sameSite: "lax",
        })
        .status(200)
        .json({ user, token });
    } catch (e) {
      res.status(400).json({ error: e });
    }
  });

router.route("/login").post(async (req, res) => {
  try {
    const { user, token } = await userData.login(req.body);
    res
      .cookie("token", token, {
        maxAge: 345600000,
        httpOnly: true,
        sameSite: "lax",
      })
      .status(200)
      .json({ user, token });
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.route("/logout").post(async (req, res) => {
  try {
    res.clearCookie("token").status(200).send();
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
