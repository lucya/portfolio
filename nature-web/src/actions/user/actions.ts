/**
 * @author nature
 * @description 사용자 로그인, 로그아웃, 신규가입
 */
import { userActions } from "../../reducers/userSlice";
import http from "../../app/http-common";
import { persistor } from '../../app/store'
import { UserType } from "./types";
import { Dispatch } from "redux";

// action
const login = (user: UserType) => {
  return async (dispatch: Dispatch) => {
    const res = await http.post('/user/login', user)
      .catch((error) => {
        alert('없는 계정이거나 email 또는 비밀번호를 확인해주세요.');
        console.error('login error', error)
        throw error;
      });

    if (res) {
      console.log('res', res)
      let data = res.data;
      dispatch(userActions.login({
        userInfo: data.userInfo,
      }));
    }
  }
}
const logout = () => {
  const purge = async () => {
    await persistor.purge();
  }
  return async (dispatch: Dispatch) => {
    const res = await http.post('/user/logout').catch((error) => {
      alert(error.message);
      throw error;
    })
    await purge(); // state 초기화
    if (res) {
      dispatch(userActions.logout());
    }
  }
}
const signup = (formData: FormData) => {
  return async (dispatch: Dispatch) => {
    const res = await http.post('/user/signup', formData,
      {
        headers: { "Content-Type": "mutipart/form-data" },
      }
    ).catch((error) => {
      alert('일시적인 오류가 발생했습니다. 재시도해주세요.')
      console.error(error);
      throw error;
    })

    if (res) {
      console.log('res', res)
      let data = res.data;
      dispatch(userActions.signup({
        userInfo: data.userInfo,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));
    }
  }
}

const userAction = {
  login,
  logout,
  signup,
}
export default userAction;