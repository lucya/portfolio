import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AuthService() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['access-token', 'refresh-token']);
  const authCheck = () => {
    const token = cookies;
    console.log('cookies', token);
    // Todo: 서버에서 체크 해야함
    if (token['access_token']) {
      navigate('/movies');
      // window.location.href = '/movies';
    } else {
      navigate('/');
    }
  }
  return { authCheck }
}
export default AuthService;