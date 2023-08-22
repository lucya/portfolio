/**
 * @description login, logout, signup Services
 * firebas 인증 상태 지속성 유형: https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ko
 * @author nature
 */
const jwt = require('jsonwebtoken')
const db = require('../db/firebaseDb')
// setDoc is update
// addDoc is used when generating a new id.
const { addDoc, getDoc, setDoc, doc } = require("firebase/firestore/lite");
const {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  browserSessionPersistence,
} = require('firebase/auth');

const getUser = async (uid) => {
  try {
    console.log('*** getUser uid **', uid);
    const usersRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(usersRef);
    if (!userSnapshot.exists()) {
      throw new Error('Has no user')
    }
    const userInfo = userSnapshot.data();
    const user = {
      username: userInfo.username,
      photoURL: userInfo.photoURL,
      uid: userInfo.uid
    }
    return user;
  } catch (error) {
    throw error;
  }
}

const addUser = async (userInfo) => {
  delete userInfo.password;
  userInfo.createDate = Date.now();

  try {
    const usersRef = doc(db, "users", userInfo.uid);
    return await setDoc(usersRef, userInfo)
      .then(() => {
        return userInfo;
        console.log('*** addUser  **', userInfo);
      })
      .catch((error) => {
        throw error;
      })

  } catch (error) {
    console.log(error);
    error.message = 'Add user failed';
    deleteUserAuthenticated();
    throw error;
  }
}

const deleteUserAuthenticated = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  deleteUser(user).then(() => {
    console.log('deleteUserAuthenticated success')
  }).catch((error) => {
    throw error;
  });
}

const doLogin = async (userInfo, res) => {
  const auth = getAuth();

  return await setPersistence(auth, browserSessionPersistence)
    .then(async () => {

      let userCredential = await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)

      // Signed in
      const user = userCredential.user;
      const uid = user.uid;

      return (async () => {
        let loginUser = await getUser(uid);
        console.log('doLogin success userInfo', loginUser)
        return loginUser
      })();

    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

const doSignup = async (userInfo) => {

  console.log('doSignup userInfo', userInfo);
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .catch((error) => {
      console.log(error);
      throw error;
    });
  // console.log('userCredential', userCredential)

  const user = userCredential.user;
  userInfo.uid = user.uid;
  const loginUser = await addUser(userInfo);

  return {
    userInfo: loginUser,
  };
}
const doLogout = async (res) => {
  const auth = getAuth();
  return await signOut(auth);
}

const getToken = (userInfo) => {
  const token = jwt.sign({
    uid: userInfo.uid,
    photoURL: userInfo.photoURL,
    username: userInfo.username,
  }, process.env.TOKEN_KEY, {
    expiresIn: '1h',
    issuer: 'nature'
  })
  return token;
}

const checkToken = (req) => {
  console.log('checkToken', req.cookies.access_token)
  if (req.cookies && req.cookies.access_token) {
    return jwt.verify(req.cookies.access_token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log('err', err)
        throw err
      }
      console.log('decoded', decoded)
      return decoded;
    })
  }
  throw new Error;
}

module.exports = {
  doLogin,
  doSignup,
  doLogout,
  getToken,
  checkToken,
}