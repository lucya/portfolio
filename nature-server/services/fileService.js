const { app } = require('../FirebaseConfig');
const { getStorage, ref, uploadBytes } = require("firebase/storage")

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const uploadProfile = (file) => {
  const profileRef = ref(storage, 'profile');

  // 'file' comes from the Blob or File API
  uploadBytes(profileRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!', snapshot);
  });
}

module.exports = {
  uploadProfile
}