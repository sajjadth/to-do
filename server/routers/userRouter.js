const router = require("express").Router();
const User = require("../models/userModel");
const List = require("../models/listModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");

router.post("/register", async (req, res) => {
  if (
    !req.body.password ||
    !req.body.username ||
    !req.body.email ||
    !req.body.firstNmae ||
    !req.body.lastName
  )
    res.status(400).json({ success: false });
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
  const user = await new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  const list = await new List({
    _id: user._id,
    username: user.username,
  });
  if (!user) res.status(404).json({ success: false });

  try {
    user.save((err) => {
      if (err) {
        res.status(404).json({
          success: false,
          message: "username or email already taken!",
        });
      } else {
        list.save((err) => {
          if (err) {
            res.status(400).json({ success: false });
          } else {
            res.status(200).json({
              success: true,
            });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const passwordChecking = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!user) {
    res.status(404).json({
      success: false,
    });
  }

  if (user && passwordChecking) {
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({
      success: true,
      token: token,
    });
  } else {
    res.status(404).json({ success: false });
  }
});

router.get("/user", auth, async (req, res) => {
  const user = await User.findOne({
    _id: req.user.id,
    username: req.user.username,
  });
  res.json(
    await {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    }
  );
});

router.put("/user/edit/password", auth, async (req, res) => {
  await User.findOne({
    _id: req.user.id,
    username: req.user.username,
  })
    .then((data) => {
      const passwordChecking = bcrypt.compareSync(
        req.body.password,
        data.password
      );
      const salt = bcrypt.genSaltSync(15);
      const newPassword = bcrypt.hashSync(req.body.newPassword, salt);
      if (passwordChecking) {
        data.password = newPassword;
        data.save();
        res.status(200).json({ success: true });
      } else {
        res.status(406).json({ success: false });
      }
    })
    .catch((err) => console.log("error in changing password:", err));
});

router.delete("/delete", auth, async (req, res) => {
  const user = await User.findOne({
    _id: req.user.id,
    username: req.user.username,
  });
  const passwordChecking = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (passwordChecking) {
    await User.findOneAndDelete(
      { _id: req.user.id, username: req.user.username },
      () => {
        List.findOneAndDelete(
          { _id: req.user.id, username: req.user.username },
          () => {
            res.status(200).json({ success: true });
          }
        );
      }
    );
  } else {
    res.status(400).json({ success: false });
  }
});

module.exports = router;
