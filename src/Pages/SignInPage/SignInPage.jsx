import React, { useState } from "react";
import "./SignInPage.scss";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import Hooks from './Hooks'
const SignInPage = () => {
  let [actionActive, setActionActive] = useState("signin");
  const {SignUp,SignIn} = Hooks()
  return (
    <div className="SignInPage">
      <div className="SignInPageContainer">
        <div
          className={
            actionActive == "signin"
              ? "SignInAction actionActive"
              : "SignInAction"
          }
        >
          <div className="SignInPageBoxLogin">
            <h3 className="SignInPageBoxLoginTitle">ĐĂNG NHẬP</h3>
            <form className="SignInPageForm" id='SignInPageForm' onSubmit={SignIn}>
              <div className="SignInPageBoxInput">
                <input
                  autoComplete="off"
                  type="text"
                  id="email"
                  name="Mail"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <div className="SignInPageBoxInput">
                <input
                  autoComplete="off"
                  type="password"
                  id="password"
                  name="Password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <Link
                to="#"
                className="SignInPageForgotPassword"
                onClick={() => setActionActive("forgot")}
              >
                Quên mật khẩu
              </Link>
              <Link
                to="#"
                className="SignInPageSignUp"
                onClick={() => setActionActive("signup")}
              >
                Đăng ký tài khoản mới ngay
              </Link>
              <button type='submit'  className="SignInBtn" form="SignInPageForm" >Đăng Nhập</button>

            </form>
          </div>
          <div className="SignInPageBoxAnotherLogin">
            <h3 className="SignInPageBoxAnotherLoginTitle">Hoặc</h3>
            <div className="SignInPageBoxAnotherLoginBox">
              <Link to="#" className="SignInPageBoxAnotherLoginFB">
                <FaFacebook></FaFacebook> Đăng nhập bằng Facebook
              </Link>
              <Link to="#" className="SignInPageBoxAnotherLoginGG">
                <AiFillGoogleCircle></AiFillGoogleCircle> Đăng nhập bằng Google
              </Link>
            </div>
          </div>
        </div>
        <div
          className={
            actionActive == "signup"
              ? "SignUpAction actionActive"
              : "SignUpAction"
          }
        >
          <div className="SignUpContainer">
            <h3 className="SignUpTitle">ĐĂNG KÝ</h3>
            <form className="SignUpForm" id="SignUpForm"  onSubmit={SignUp}>
              <input name='Mail' type="text" placeholder="Nhập email" />
              <input name='Password' type="password" placeholder="Nhập mật khẩu" />
              <input name='RePassword' type="password" placeholder="Xác nhận mật khẩu" />
            </form>
            <div className="SignUpButtons">
              <button type='submit'  className="SignUpBtn" form="SignUpForm" >Đăng Ký</button>
                
              
              <Link
                to="#"
                className="BackBtn"
                onClick={() => setActionActive("signin")}
              >
                Quay Lại
              </Link>
            </div>
          </div>
        </div>
        <div
          className={
            actionActive == "forgot"
              ? "ForgotAction actionActive"
              : "ForgotAction"
          }
        >
          <h3 className="ForgotTitle">QUÊN MẬT KHẨU</h3>
          <form className="ForgotForm">
            <input type="text" placeholder="Nhập email của bạn" />
            <span className="note">
              *Mật khẩu mới sẽ được gửi về hòm thư của bạn. Vui lòng kiểm tra
              sau hòm thư sau khi gửi.
            </span>
          </form>
          <div className="ForgotButtons">
            <Link to="#" className="ForgotBtn">
              Gửi mật khẩu mới
            </Link>
            <Link
              to="#"
              className="BackBtn"
              onClick={() => setActionActive("signin")}
            >
              Quay lại
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
