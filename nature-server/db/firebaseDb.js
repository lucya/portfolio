const { app } = require('../FirebaseConfig');
const { getFirestore } = require('firebase/firestore/lite');

const db = getFirestore(app);

module.exports = db
