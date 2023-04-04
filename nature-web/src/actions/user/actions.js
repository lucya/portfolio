import { userActions } from "../../reducers/userReducer";
import http from "../../app/http-common";
// action
const login = (user) => {
  console.log('useractions', user)
  // 가지고 있는 토큰 넣어주기!
  // 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
  // http.defaults.headers.common["Authorization"] = USER_TOKEN; 
  return async (dispatch, getState) => {
    await http
      .post('/user/login', user)
      .then((res) => {
        console.log('res', res)
        let userInfo = res.data;
        console.log('userinfo', userInfo);
        // payload : {userInfo}
        dispatch(userActions.login({ userInfo }));
      })
      .catch((err) => {
        console.log(err);
        throw err;
        // dispatch({ type: 'LOGIN_ERROR', payload: err });
      });
  }
}
const logout = () => {
  return (dispatch, getState) => {
    http
      .post('/user/logout')
      .then((res) => {
        dispatch(userActions.logout());
      })
      .catch((err) => {
        console.log(err);
        throw err;
        // dispatch({ type: 'LOGIN_ERROR', payload: err });
      });
  }
}
const signup = (userState) => {
}

const userAction = {
  login,
  logout
}
export default userAction;