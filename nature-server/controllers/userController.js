const { doLogin, doSignup, doLogout } = require('../services/userService')
const { uploadProfile } = require('../services/fileService')
const User = require('../models/user')

const login = async (req, res, next) => {
  const User = req.body;

  try {
    const data = await doLogin(User, res);
    console.log('lging in', data)
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const logout = async (req, res, next) => {
  try {
    await doLogout(res);

    res.status(200).send("로그아웃!");
  } catch (error) {
    res.status(400).send(error.message);
  }

}

const signup = async (req, res, next) => {
  console.log('signup', req.body);
  const user = req.body.user;
  const file = req.body.file;
  /* try {
    console.log('signup  ', user)
    console.log('signup file ', file)
    // if (file) {
    //   const photoURL = await uploadProfile(file);
    //   console.log('upload', photoURL);
    //   user.photoURL = photoURL;
    // }
    const data = await doSignup(user);
    console.log('xxx', data);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  } */
  // if (file) {
  //   const photoURL = await uploadProfile(file).catch(error => {
  //     res.status(400).send(error.message);
  //   });
  //   console.log('upload', photoURL);
  //   user.photoURL = photoURL;
  // }
  const data = await doSignup(user).catch(error => {
    res.status(400).send(error.message);
  })
  console.log('xxx', data);
  res.status(200).send(data);

  // const User = req.body.user;
  // try {
  //   console.log('signup  ', User)

  //   const data = await doSignup(User);
  //   console.log('xxx', data);
  //   res.status(200).send(data);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
}

const upload = async (req, res, next) => {
  const file = req.body.formData;
  console.log('upload ', req.body);
  try {
    const photoURL = await uploadProfile(file);
    res.status(200).send(photoURL);
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  login,
  logout,
  signup,
  upload
}