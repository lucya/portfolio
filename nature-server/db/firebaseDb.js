const { app } = require('../config/firebaseConfig');
const { getFirestore } = require('firebase/firestore/lite');

const db = getFirestore(app);

module.exports = db
