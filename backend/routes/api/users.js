const express = require('express');

//? Authentication
const {setTokenCookie} = require('../../utils/auth');

//? Models
const {User} = require('../../db/models');

//? Validation
const {validateSignup} = require('../../utils/validation');

const router = express.Router();

/**********************************************************************************/
//! Sign up
router.post('/', validateSignup, async (req, res) => {
  const {name, email, password, username} = req.body;

  //* Email verification
  const emailVerification = await User.findOne({where: {email}});

  if (emailVerification) {
    return res.status(403).json({
      message: 'User already exists',
      statusCode: 403,
      errors: {
        email: 'User with that email already exists',
      },
    });
  }

  //* Username verification
  const usernameVerification = await User.findOne({where: {username}});

  if (usernameVerification) {
    return res.status(403).json({
      message: 'User already exists',
      statusCode: 403,
      errors: {
        email: 'User with that username already exists',
      },
    });
  }

  //* Creation of a new user
  const user = await User.signup({
    name,
    email,
    username,
    password,
  });

  //* Excluding undesired parameters
  // const newUser = await User.scope('signUpUser').findOne({
  //   where: {id: user.id},
  //   attributes: {exclude: ['id']},
  // });

  // newUser.dataValues.token = await setTokenCookie(res, user);
  await setTokenCookie(res, user);

  return res.json({user});
});

/**********************************************************************************/
//! User Edit

router.put('/', async (req, res) => {
  const {name, email, username, profileImg} = req.body;

  //* Email verification
  const emailVerification = await User.findOne({where: {email}});

  if (emailVerification && emailVerification.email !== req.body.email) {
    return res.status(403).json({
      message: 'User already exists',
      statusCode: 403,
      errors: {
        email: 'User with that email already exists',
      },
    });
  }
  //* Username verification
  const usernameVerification = await User.findOne({where: {username}});

  if (
    usernameVerification &&
    usernameVerification.username !== req.body.username
    ) {
      return res.status(403).json({
        message: 'User already exists',
        statusCode: 403,
        errors: {
          email: 'User with that username already exists',
        },
      });
    }

    const userId = req.user.id;
    //* Editing user

    const user = await User.update({name, username, email, profileImg, userId});

    console.log(user);
  await setTokenCookie(res, user);

  return res.json({user});
});

/**********************************************************************************/
//! User Password Edit

// router.put('/password', async (req, res) => {
//   const {password, id} = req.body;

//   //* Editing user's password

//   const user = await User.update({password, id});

//   await setTokenCookie(res, user);

//   return res.json({user});
// });

module.exports = router;
