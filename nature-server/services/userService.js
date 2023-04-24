/**
 * @description login, logout, signup Services
 * firebas 인증 상태 지속성 유형: https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ko
 * @author nature
 */
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
    delete userInfo.password;
    return userInfo;
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

  await setPersistence(auth, browserSessionPersistence)
    .then(async () => {
      return signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          const uid = user.uid;

          return (async () => {
            let loginUser = await getUser(uid);
            console.log('doLogin success userInfo', loginUser)
            return {
              userInfo: loginUser
            };
          })();

        })
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  /*   return await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
  
        return (async () => {
          let loginUser = await getUser(uid);
          console.log('doLogin success userInfo', loginUser)
          return {
            userInfo: loginUser
          };
        })();
  
      })
      .catch((error) => {
        throw error;
      }); */
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

module.exports = {
  doLogin,
  doSignup,
  doLogout,
}