const {
  doLogin,
  doSignup,
  doLogout,
  getToken,
  checkToken,
} = require('../services/userService')
const { uploadProfile } = require('../services/fileService')
const User = require('../models/user')


const login = async (req, res, next) => {
  const User = req.body;

  try {
    const data = await doLogin(User, res);
    console.log(data);
    const token = getToken(data);
    // res.cookie('access_token', token, {
    //   httpOnly: true,


    res.cookie("access_token", token, {
      sameSite: process.env.NODE_ENV === "production" ? 'none' : '',
      secure: true, // https, ssl 모드에서만
      httpOnly: true, // javascript 로 cookie에 접근하지 못하게 한다.
    });

    // res.header('access-token', token)
    // res.header('Authorization', 'Bearer '+ token)
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
}

const logout = async (req, res, next) => {
  try {
    await doLogout(res);
    if (req.cookies && req.cookies.access_token) {
      res.clearCookie('access_token');
    }
    res.status(200).send("로그아웃!");
  } catch (error) {
    res.status(400).send(error.message);
  }

}

const signup = async (req, res, next) => {
  console.log('signup req', req.body);
  console.log('signup req', req.files);

  const userInfo = JSON.parse(req.body.user);
  const file = req.files[0];

  if (file) {
    let photoURL = await uploadProfile(file);
    console.log('upload', photoURL);

    userInfo.photoURL = photoURL;
  }
  const data = await doSignup(userInfo).catch(error => {
    res.status(400).send(error.message);
  })
  console.log('xxx', data);
  res.status(200).send(data);
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

const check = async (req, res, next) => {
  console.log('check');
  try {
    const user = checkToken(req)
    res.status(200).send(user)
  } catch (error) {
    console.log('userController:check ', error.message)
    res.status(401).send(error.message)
  }
}

module.exports = {
  login,
  logout,
  signup,
  upload,
  check,
}