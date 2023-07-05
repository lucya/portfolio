import React, { useState } from "react"
import { useAppDispatch } from '../../app/hooks'
import { Link } from "react-router-dom";
import { User } from "../../actions/user/types";
import { useRef } from 'react';
import userAction from '../../actions/user/actions';
import profile_base from '../../assets/images/profile_base.png'

const SignUp: React.FC = () => {
  const [userInfo, setUserInfo] = useState(User);
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [file, setFile] = useState<File | null>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();

  const dispatch = useAppDispatch();
  const profileImg = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userInfo.password !== pwdConfirm) {
      alert("비밀번호가 일치하지 않습니다.")
      return;
    }
    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('user', JSON.stringify(userInfo));

    dispatch(userAction.signup(formData));
  }

  const handleUpload = (e: any) => {
    const reader: FileReader = new FileReader();
    const file = e.target.files && e.target.files[0]

    reader.onloadend = () => {
      setFile(file)
      if (reader.result) {
        setImagePreviewUrl(reader.result.toString());
      }
    };
    reader?.readAsDataURL(file); // by Blob
  }
  const handleUploadClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    (profileImg.current as HTMLInputElement).click();
  }
  return (
    <div className='user-wrap'>
      <h3>회원 가입</h3>

      <form className="form-container" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-wrap profile-wrap">
          {/* <svg>기본 프로필 이미지</svg> */}
          <span onClick={handleUploadClick}>
            <img src={imagePreviewUrl ? imagePreviewUrl : profile_base} alt="profile" />
          </span>
          <input type="file" name="photoURL" accept="image/*" ref={profileImg} onChange={handleUpload} />
          <label htmlFor="photoURL">프로필 이미지</label>
        </div>
        <div className="form-wrap">
          <label htmlFor="usename">Username <span className="warnning">*</span></label>
          <input type="text" name="username" autoComplete="off"
            onChange={handleChange} maxLength={20} required />
        </div>
        <div className="form-wrap">
          <label htmlFor="email">Email <span className="warnning">*</span></label>
          <input type="email" name="email" autoComplete="off" inputMode="email"
            onChange={handleChange} required />
        </div>
        <div className="form-wrap">
          <label htmlFor="password">Password <span className="warnning">*</span></label>
          <input type="password" name="password" autoComplete="off"
            placeholder="최소 6자 이상"
            onChange={handleChange} required />
        </div>
        <div className="form-wrap">
          <label htmlFor="password-confirm">Password Confirm <span className="warnning">*</span></label>
          <input type="password" name="password-confirm" autoComplete="off"
            placeholder="최소 6자 이상"
            onChange={(e) => setPwdConfirm(e.target.value)} required />
        </div>
        <div className="btn-wrap">
          <button type="submit">가입</button>
          <Link to='/'>
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
export default SignUp;