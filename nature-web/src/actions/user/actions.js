import axios from 'axios';
// action
export const login = (userState) => {
  return (dispatch) => {
    axios
      .post('/login', userState)
      .then((res) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', payload: err });
      });
  }
}