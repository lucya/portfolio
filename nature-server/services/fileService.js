/**
 * @author nature
 * @description
 *  firebase v9 파일 업로드 api : https://firebase.google.com/docs/storage/web/upload-files?hl=ko
 *  update file url 
 *  ex) // https://firebasestorage.googleapis.com/v0/b/nature-portfolio-7b1db.appspot.com/o/profile%2Fprofile_base.png?alt=media&token=8fb5aca8-b21f-49c6-a84a-d730a2cfb101
 *  token은 알수 없어 쿼리 파라미터 없이 호출 가능
 */
const { app } = require('../config/firebaseConfig');
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage")

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const uploadProfile = (file) => {
  const storageRef = ref(storage, `/profile/${file.originalname}`);

  // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, file)
  return uploadBytes(storageRef, file.buffer)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!', snapshot);
      const metadata = snapshot.metadata;
      const fullPath = encodeURIComponent(metadata.fullPath)
      const url = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/${fullPath}?alt=media`
      console.log('url : ', url);
      return url;
      // getDownloadURL(snapshot.ref).then((downloadURL) => {
      //   console.log('Download url:', downloadURL)
      // })
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
}
module.exports = {
  uploadProfile
}