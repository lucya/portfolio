import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


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