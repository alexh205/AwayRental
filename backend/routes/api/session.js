const express = require('express');

//? Authentication
const {setTokenCookie, restoreUser, requireAuth} = require('../../utils/auth');

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

  //* Excluding undesired parameters
  const loginUser = await User.findOne({
    where: {id: user.dataValues.id},
    attributes: {exclude: ['createdAt', 'updatedAt', 'hashedPassword']},
  });

  loginUser.dataValues.token = await setTokenCookie(res, user);
  const {id, name, username, email} = loginUser.dataValues;

  return res.json({id, name, username, email});
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
    return res.json(user.dataValues);
  } else return res.json({});
});

// /**********************************************************************************/
// //! Get current User
router.get('/current/:userId', async (req, res) => {
  console.log(erq.params.userId)
  //* Excluding undesired parameters
  const currUser = await User.findOne({
    where: {id: req.params.userId},
    attributes: {exclude: ['createdAt', 'updatedAt']},

  });

  currUser.token = await setTokenCookie(res, currUser);

  const {id, name, email, username, profileImg} = currUser;

  res.json({
    id,
    name,
    email,
    username,
    profileImg,
  });
});

module.exports = router;
