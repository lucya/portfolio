// import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { userActions } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";


function AuthService() {
  const navigate = useNavigate();
  const { loggedIn } = useSelector(state => state.userReducer)

  const authCheck = () => {
    if (!loggedIn) {
      navigate('/home');
    }

  }
  return { authCheck }
}
export default AuthService;