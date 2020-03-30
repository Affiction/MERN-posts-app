const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const secretKey = config.get('jtwSecretKey');

const User = require('../../models/User');

router.post(
  '/',
  [
    check('email', 'Please, provide valid email')
      .isEmail()
      .normalizeEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      const isUserNotExist = user == null;

      if (isUserNotExist) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Credentials invalid' }] });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Credentials invalid' }] });
      }

      const jwtPayload = { user: { id: user.id } };

      jwt.sign(jwtPayload, secretKey, { expiresIn: '1d' }, (err, token) => {
        if (err) throw err;

        res.status(200).json({ token });
      });
    } catch (error) {
      res.status(500, `Internal Server Error`);
    }
  }
);

module.exports = router;
