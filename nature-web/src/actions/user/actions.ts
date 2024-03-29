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
    await http.post('/api/user/login', user)
      .then(({ data }) => {
        dispatch(userActions.login({
          user: data.userInfo,
        }));

      }).catch((error) => {
        alert('없는 계정이거나 email 또는 비밀번호를 확인해주세요.');
        throw error;
      })
  }
}
const logout = () => {
  const purge = async () => {
    await persistor.purge();
  }
  return async (dispatch: Dispatch) => {
    await http.post('/api/user/logout')
      .then(({ data }) => {
        purge(); // state 초기화
        sessionStorage.clear();
        dispatch(userActions.logout());
      })
      .catch((error) => {
        alert(error.message);
        throw error;
      })
  }
}
const signup = (formData: FormData) => {
  return async (dispatch: Dispatch) => {
    await http.post('/api/user/signup', formData,
      {
        headers: { "Content-Type": "mutipart/form-data" },
      }
    )
      .then(({ data }) => {
        dispatch(userActions.signup({
          user: data.userInfo,
        }));
      })
      .catch((error) => {
        alert('일시적인 오류가 발생했습니다. 재시도해주세요.')
        console.error(error);
        throw error;
      })
  }
}

const check = () => {
  return async () => {
    await http.get('/api/user/check')
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        alert("로그인 후 이용해주세요.");
        return null;
      })
  }
}

const userAction = {
  login,
  logout,
  signup,
  check,
}
export default userAction;