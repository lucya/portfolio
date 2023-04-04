const { doLogin, doSignup, doLogout } = require('../services/userService')
const User = require('../models/user')

const login = async (req, res, next) => {
  const User = req.body;

  try {
    const data = await doLogin(User);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const logout = async (req, res, next) => {
  try {
    await doLogout();
    res.status(200).send("로그아웃!");
  } catch (error) {
    res.status(400).send(error.message);
  }
  // const auth = getAuth();
  // await signOut(auth)
  //   .then(() => {
  //     // Sign-out successful.
  //     res.status(200).send('Successfully logged out')
  //   }).catch((error) => {
  //     // An error happened.
  //     res.status(400).send(error.message);
  //   });
}

const signup = async (req, res, next) => {
  const User = req.body;

  try {
    const data = await doSignup(User);
    console.log('xxx', data);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  login,
  logout,
  signup,
}