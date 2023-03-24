const express = require('express');

//? Authentication
const {setTokenCookie, restoreUser} = require('../../utils/auth');

//? Models
const {User} = require('../../db/models');

//? Validation
const {validateLogin} = require('../../utils/validation');

const router = express.Router();

/**********************************************************************************/
//! Log in
router.post('/', validateLogin, async (req, res, next) => {
  const {credential, password} = req.body;

  const user = await User.login({credential, password});

  //* User validation
  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);

  return res.json({user});
});

/**********************************************************************************/

//! Log out
router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({message: 'success'});
});

/**********************************************************************************/

//! Restore session user
router.get('/', restoreUser, (req, res) => {
  const {user} = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

module.exports = router;
