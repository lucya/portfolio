const { db } = require('../db/firebaseDb')

const usersRef = db.collection('users');

const getUser = async (uid) => {

  await usersRef.doc(uid).get()
    .then((doc) => {
      if (!doc.exists()) {
        throw new Error('No such user');
      } else {
        const user = doc.data();
        console.log('*** getUser **', user);
        return user;
      }
    })
    .catch((error) => {
      throw error;
    });
}

const addUser = async (user) => {
  await usersRef('users').doc(user.uid).set(user)
    .then((data => {
      console.log('*** addUser **', data);
      return data;
    }))
    .catch((error) => {
      throw error;
    })
}

module.exports = {
  getUser,
  addUser,
}