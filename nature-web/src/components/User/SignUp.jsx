import { useState } from "react"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { User } from "../../actions/user/types";
import { useRef } from 'react';
import userAction from '../../actions/user/actions';
import profile_base from '../../assets/images/profile_base.png'

function SignUp() {
  const [userInfo, setUserInfo] = useState(User);
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const profileImg = useRef(null);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userInfo);

    if (userInfo.password !== pwdConfirm) {
      alert("비밀번호가 일치하지 않습니다.")
      return;
    }
    const formData = new FormData();
    console.log('formData', file);
    formData.append('file', file);
    // formData.append('user', userInfo);

    // formData.append('user', new Blob([JSON.stringify(userInfo)], {
    //   type: "application/json"
    // }));
    formData.append('user', JSON.stringify(userInfo));

    console.log('xxx', Object.fromEntries(formData).file)
    for (let key of formData.keys()) {
      console.log('aaa', key);
    }
    for (let value of formData.values()) {
      console.log('aaa', value);
    }
    dispatch(userAction.signup(Object.fromEntries(formData)));
  }

  const handleUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);

    reader.onloadend = () => {
      setFile(file)
      setImagePreviewUrl(reader.result);
    };
    reader?.readAsDataURL(file);

    // let formData = new FormData();
    // formData.append('file', file);
    // console.log(formData);
    // dispatch(userAction.upload(formData))
  }
  const handleUploadClick = (e) => {
    e.preventDefault();
    profileImg.current.click();
  }
  return (
    <div className='user-wrap'>
      <h3>회원 가입</h3>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-wrap profile-wrap">
          {/* <svg>기본 프로필 이미지</svg> */}
          <span onClick={handleUploadClick}>
            <img src={imagePreviewUrl ? imagePreviewUrl : profile_base} alt="profile" />
          </span>
          <input type="file" name="photoURL" accept="image/*" ref={profileImg} style={{ display: 'none' }} onChange={handleUpload} />
          <label>프로필 이미지</label>
        </div>
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
          <button type="submit">등록</button>
          <Link to='/'>
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
export default SignUp;