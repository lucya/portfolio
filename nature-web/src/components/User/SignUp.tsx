import React, { useEffect, useState, FormEvent } from "react"
import { useAppDispatch } from '../../app/hooks'
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../actions/user/types";
import { useRef } from 'react';

import userAction from '../../actions/user/actions';
import profile_base from '../../assets/images/profile_base.png'

const SignUp: React.FC = () => {
  const [userInfo, setUserInfo] = useState(User);
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [file, setFile] = useState<File | null>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();

  const initValid = { invalid: false, msg: '' }
  const [isValid1, setIsValid1] = useState(initValid)
  const [isValid2, setIsValid2] = useState(initValid)

  const dispatch = useAppDispatch();
  const profileImg = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });

  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('user', JSON.stringify(userInfo));

    try {
      dispatch(userAction.signup(formData));

      const email = userInfo.email;
      setTimeout(() => {
        alert("회원 가입을 환영합니다.")
        navigate('/', { state: { email: email } })
      }, 1500)
    } catch (error) {
      console.log(error)
    }
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

  const validator = (value: any, name: string) => {
    if (name === 'password') {
      let { invalid } = initValid
      let { msg } = initValid

      if (value.length >= 1 && value.length < 6) {
        invalid = true;
        msg = "6자 이상이 되어야합니다."
      }
      setIsValid1({ invalid: invalid, msg: msg })
    }
    if (name === 'password-confirm') {
      let { invalid } = initValid
      let { msg } = initValid

      if (pwdConfirm.length && (userInfo.password !== pwdConfirm)) {
        invalid = true
        msg = "비밀번호가 일치하지 않습니다."
      }
      setIsValid2({ invalid: invalid, msg: msg })
    }
  }

  useEffect(() => {
    usernameRef.current?.focus();
  }, [])

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
          <label htmlFor="photoURL">프로필 이미지 변경</label>
        </div>
        <div className="form-wrap">
          <label htmlFor="usename">Username <span className="warnning" style={{ fontSize: 'small' }}>* 필수입력 항목</span></label>
          <input type="text" name="username" autoComplete="off" ref={usernameRef}
            onChange={handleChange} maxLength={20} required />
        </div>
        <div className="form-wrap">
          <label htmlFor="email">Email <span className="warnning" style={{ fontSize: 'small' }}>* 필수입력 항목</span></label>
          <input type="email" name="email" autoComplete="off" inputMode="email"
            onChange={handleChange} required />
        </div>
        <div className="form-wrap">
          <span className="inWarnning">
            <label htmlFor="password">Password <span className="warnning">*</span></label>
            {isValid1.invalid && <span className="warnning" style={{ fontSize: 'small' }}>{isValid1.msg}</span>}
          </span>
          <input type="password" name="password" autoComplete="off"
            placeholder="최소 6자 이상"
            onKeyUp={(e: FormEvent<HTMLInputElement>) => validator(e.currentTarget.value, e.currentTarget.name)}
            onChange={handleChange} required />
        </div>
        <div className="form-wrap">
          <span className="inWarnning">
            <label htmlFor="password-confirm">Password Confirm <span className="warnning">*</span></label>
            {isValid2.invalid && <span className="warnning" style={{ fontSize: 'small' }}>{isValid2.msg}</span>}
          </span>
          <input type="password" name="password-confirm" autoComplete="new-password"
            placeholder="최소 6자 이상"
            onKeyUp={(e: FormEvent<HTMLInputElement>) => validator(e.currentTarget.value, e.currentTarget.name)}
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