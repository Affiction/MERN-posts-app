const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('email', 'Please, provide valid email')
      .isEmail()
      .normalizeEmail(),
    check(
      'password',
      'Password should contains at least 6 characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      const { name, email, password } = req.body;
      let user = await User.findOne({ email });
      const isUserExist = user != null;

      if (isUserExist) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exist' }] });
      }

      const salt = await bcrypt.genSalt(10);
      const saltedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: saltedPassword
      });

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500, `Internal Server Error ${error}`);
    }
  }
);

module.exports = router;
