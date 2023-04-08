import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { userActions } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";


function AuthService() {
  const navigate = useNavigate();
  /* const [cookies, setCookies, removeCookie] = useCookies(['access_token', 'refresh_token']); */
  const { loggedIn } = useSelector(state => state.userReducer)

  const authCheck = () => {
    /* const token = cookies;
    console.log('cookies', token);
    // Todo: 서버에서 체크 해야함
    if (token['access_token']) {
      navigate('/movies');
    } else {
      navigate('/');
    } */
    if (!loggedIn) {
      navigate('/');
    }

  }
  // const logout = () => {
  //   // removeCookie('access_token');
  //   // removeCookie('refresh_token');
  //   removeCookie();
  //   navigate('/');
  // }
  return { authCheck }
}
export default AuthService;