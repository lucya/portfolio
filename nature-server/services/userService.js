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
} = require('firebase/auth');


const getUser = async (uid) => {
  try {
    console.log('*** getUser uid **', uid);
    const usersRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(usersRef);
    if (!userSnapshot.exists()) {
      throw new Error('Has no user')
    }
    const user = userSnapshot.data();
    console.log('*** getUser **', user);
    return user;
  } catch (error) {
    throw error;
  }
}

const addUser = async (user) => {
  try {
    const usersRef = doc(db, "users", user.uid);
    return await setDoc(usersRef, user)
      .then(() => {
        console.log('*** addUser  **', user);
        return user;
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

const doLogin = async (userInfo) => {
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uid = userCredential.user.uid;
      return getUser(uid);

    })
    .catch((error) => {
      throw error;
    });
}

const doSignup = async (userInfo) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      userInfo.uid = uid;
      return addUser(userInfo);
    })
    .catch((error) => {
      throw error;
    });
}
const doLogout = async () => {
  const auth = getAuth();
  return await signOut(auth);
}

module.exports = {
  doLogin,
  doSignup,
  doLogout,
}