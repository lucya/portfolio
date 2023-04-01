const {
  auth,
  app
} = require('../db/firebaseDb')
const { getUser, addUser } = require('../services/userService')
const User = require('../models/user')
// const firestore = firebase.firestore();

// const { getAuth } = require('firebase-admin/auth')
const {
  // getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} = require('firebase/auth');

// const auth = getAuth(app);

const login = async (req, res, next) => {

  const User = req.body;
  console.log('xxxx', User)
  
  // const auth = getAuth();
  await signInWithEmailAndPassword(auth, User.email, User.password)
    .then((userCredential) => {
      console.log('wwww', userCredential)
      // Signed in
      // const user = userCredential.user;
      const user = getUser(userCredential.user.uid);
      console.log('login success', user)
      res.status(200).send(user);
    })
    .catch((error) => {
      console.log('rrrrr', error)
      res.status(400).send(error.message);
    });

}

const logout = async (req, res, next) => {
  // const auth = getAuth();
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
      res.status(200).send('Successfully logged out')
    }).catch((error) => {
      // An error happened.
      res.status(400).send(error.message);
    });
}

const signup = async (req, res, next) => {
  // const data = req.body;
  const User = req.body;
  // TODO:  login call
  // const auth = getAuth();
  await createUserWithEmailAndPassword(auth, User.email, User.password)
    .then((userCredential) => {
      // Signed in
      // const user = userCredential.user;
      const uid = userCredential.user.uid;
      User.uid = uid;
      const user = addUser(User);
      console.log('signup successful', user)
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });

}

module.exports = {
  login,
  logout,
  signup,
}