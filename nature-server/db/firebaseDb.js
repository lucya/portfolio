const admin = require('firebase-admin');
const config = require('../config');

// const db = admin.initializeApp(config.firebaseConfig);

// const { initializeApp } = require('firebase/app');
const { initializeApp } = require('firebase-admin/app');

// const { getAuth } = require('firebase/auth');
const { getAuth } = require('firebase-admin/auth');

const { getFirestore } = require('firebase-admin/firestore');

// const app = admin.initializeApp(config.firebaseConfig);//

const app = initializeApp(config.firebaseConfig);
// const auth = getAuth(app);
const auth = getAuth();
// const db = admin.firestore();
const db = getFirestore();

module.exports = {
  db,
  auth,
  app
}