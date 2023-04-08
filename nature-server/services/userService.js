/**
 * @description login, logout, signup Services
 * @author nature
 */
const db = require('../db/firebaseDb')
// setDoc is update
// addDoc is used when generating a new id.
const { addDoc, getDoc, setDoc, doc } = require("firebase/firestore/lite");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  signInAnonymously,
} = require('firebase/auth');

const cookieConfig = {
  //cookieConfig는 키, 밸류 외에 설정을 보낼 수 있다.
  maxAge: 60000, // 1분
  //밀리초 단위로 들어가는데 30분(1800000) 만료 쿠키를 생성한다. 
  // path: '/',
  httpOnly: true,
  //통신할때만 접속할 수 있다. 기본값은 false임 
  signed: true,
  //쿠키를 암호화 시킨다. 
};
const setCookies = (res, token) => {
  const accessToken = token.accessToken;
  const refreshToken = token.refreshToken;
  res.cookie('access_token', accessToken)
  res.cookie('refresh_token', refreshToken)
}
const clearCookies = (res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}

const getUser = async (uid) => {
  try {
    console.log('*** getUser uid **', uid);
    const usersRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(usersRef);
    if (!userSnapshot.exists()) {
      throw new Error('Has no user')
    }
    const userInfo = userSnapshot.data();
    delete userInfo.password;
    return userInfo;
  } catch (error) {
    throw error;
  }
}

const addUser = async (userInfo) => {
  try {
    const usersRef = doc(db, "users", userInfo.uid);
    return await setDoc(usersRef, userInfo)
      .then(() => {
        console.log('*** addUser  **', userInfo);
        delete userInfo.password;
        return userInfo;
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
  return await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log('doLogin success', user);
      setCookies(res, user.stsTokenManager);

      const token = user.stsTokenManager;
      console.log('doLogin success', token);
      const uid = userCredential.user.uid;
      let loginUser = null;
      return (async () => {
        loginUser = await getUser(uid);
        console.log('doLogin success userInfo', loginUser)
        return {
          userInfo: loginUser,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken
        };
      })();

    })
    .catch((error) => {
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

  const token = user.stsTokenManager;
  const loginUser = await addUser(userInfo);
  console.log('doLogin success userInfo', loginUser)
  return {
    userInfo: loginUser,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken
  };


  /* return await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then((userCredential) => {
      const user = userCredential.user;
      userInfo.uid = user.uid;

      console.log('userCredential', userCredential)
      // TODO: set photoURL after file upload 
      const token = user.stsTokenManager;
      let loginUser = null;
      return (async () => {
        loginUser = await addUser(userInfo);
        console.log('doLogin success userInfo', loginUser)
        return {
          userInfo: loginUser,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken
        };
      })();
    })
    .catch((error) => {
      throw error;
    }); */
}
const doLogout = async (res) => {
  const auth = getAuth();
  clearCookies(res)
  return await signOut(auth);
}



module.exports = {
  doLogin,
  doSignup,
  doLogout,
}