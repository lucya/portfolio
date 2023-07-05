import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";


function AuthService() {
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state: RootState) => state.userReducer)

  const authCheck = () => {
    if (!loggedIn) {
      navigate('/home');
    }

  }
  return { authCheck }
}
export default AuthService;