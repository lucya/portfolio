import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../actions/user/types";

function SignUp() {

  const [userState, setUserState] = useState(User);
  const [pwdConfirm, setPwdConfirm] = useState('');
  // const dispatch = useDispatch();

  const handleChange = (e) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userState);

    if (userState.password !== pwdConfirm) {
      alert("비밀번호가 다릅니다.")
      return;
    }
    // TODO: dispatch call action
    // dispatch(signup(userState));
  }


  return (
    <div className='user-wrap'>
      <h3>회원 가입</h3>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-wrap">
          <label >Username</label>
          <input type="text" name="username" onChange={handleChange} />
        </div>
        <div className="form-wrap">
          <label >Email</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-wrap">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className="form-wrap">
          <label>Password Confirm</label>
          <input type="password" name="password-confirm" onChange={(e) => setPwdConfirm(e.target.value)} />
        </div>
        {/* <button className="green" type="submit">가입</button>
        <Link to='/'>
          <button className="green">로그인</button>
        </Link> */}
        <div className="btn-wrap">
          <button className="green" type="submit">등록</button>
          <Link to='/'>
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
export default SignUp;