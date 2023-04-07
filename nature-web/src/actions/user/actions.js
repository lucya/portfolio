import { userActions } from "../../reducers/userSlice";
import http from "../../app/http-common";
// action
const login = (user) => {
  console.log('useractions', user)
  // 가지고 있는 토큰 넣어주기!
  // 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
  // http.defaults.headers.common["Authorization"] = USER_TOKEN; 
  return async (dispatch, getState) => {
    const res = await http.post('/user/login', user).catch((error) => {
      alert(error.message);
      throw error;
    });

    if (res) {
      console.log('res', res)
      let data = res.data;
      console.log('userinfo', data.userInfo);
      // payload : {userInfo}
      dispatch(userActions.login({
        userInfo: data.userInfo,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
    }
  }
}
const logout = () => {
  return async (dispatch, getState) => {
    const res = await http.post('/user/logout').catch((error) => {
      alert(error.message);
      throw error;
    })
    if (res) {
      dispatch(userActions.logout());
    }
  }
}
const signup = (formData) => {
  console.log('signup', formData);
  return async (dispatch, getState) => {
    const res = await http.post('/user/signup', formData, {
      headers: { "Content-Type": "multipart/form-data" },

    }).catch((error) => {
      alert(error.message)
      throw error;
    })

    if (res) {
      console.log('res', res)
      let data = res.data;
      console.log('userinfo', data.userInfo);
      // payload : {userInfo}
      dispatch(userActions.signup({
        userInfo: data.userInfo,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
    }
  }
}
// const upload = (formData) => {
//   return async (dispatch, getState) => {
//     const res = await http.post('/user/upload', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }).catch((error) => {
//       alert(error.message)
//       throw error
//     })
//     if (res) {
//       console.log('file upload', res)
//       return res;
//     }
//   }
// }


const userAction = {
  login,
  logout,
  signup,
  // upload
}
export default userAction;