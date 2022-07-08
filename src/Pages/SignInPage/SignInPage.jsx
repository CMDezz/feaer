import React, { useState } from "react";
import "./SignInPage.scss";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
const SignInPage = () => {
  let [actionActive, setActionActive] = useState("signin");
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
            <form className="SignInPageForm">
              <div className="SignInPageBoxInput">
                <input
                  autoComplete="off"
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                />
              </div>
              <div className="SignInPageBoxInput">
                <input
                  autoComplete="off"
                  type="password"
                  id="password"
                  name="password"
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
              <Link to="#" type="submit" className="SignInBtn">
                Đăng Nhập
              </Link>
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
            <form className="SignUpForm">
              <input type="text" placeholder="Nhập email" />
              <input type="password" placeholder="Nhập mật khẩu" />
              <input type="password" placeholder="Xác nhận mật khẩu" />
            </form>
            <div className="SignUpButtons">
              <Link to="#" className="SignUpBtn">
                Đăng Ký
              </Link>
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
