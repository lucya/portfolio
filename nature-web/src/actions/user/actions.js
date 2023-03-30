import { userActions } from "../../reducers/userReducer";
import http from "../../app/http-common";
// action
const login = (userState) => {
  // 가지고 있는 토큰 넣어주기!
  // 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
  // http.defaults.headers.common["Authorization"] = USER_TOKEN; 
  return async (dispatch, getState) => {
    await http
      .post('/user/login', userState)
      .then((res) => {
        let data = res.json();
        // payload : {data}
        dispatch(userActions.login({ data }));
      })
      .catch((err) => {
        console.log(err);
        throw err;
        // dispatch({ type: 'LOGIN_ERROR', payload: err });
      });
  }
}
const logout = () => {
}
const signup = (userState) => {
}

const userAction = { login }
export default userAction;