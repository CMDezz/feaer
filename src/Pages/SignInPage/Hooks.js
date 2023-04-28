import React from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Hooks = () => {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_API_URL;

    const SignUp = async (e)=>{
        e.preventDefault()
        let Mail = e.target.Mail.value
        let Password = e.target.Password.value
        let RePassword = e.target.RePassword.value
        if (Password != RePassword){
            Swal.fire({
                title: "Lỗi",
                text: "Nhập lại mật khẩu không chính xác",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.close()
                }
              });
            return;
        }
        // đăng ký tài khoản 

        const body ={
            Mail:Mail,
            Password:Password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        let resp = await fetch(baseUrl+'/user/createUser',requestOptions)
        .then(response=>{
            return response.json()
        })        
        .then(res=>{
            if (!res.Token){
                Swal.fire({
                    title: "Lỗi",
                    text: "Thông tin đăng ký không chính xác, vui lòng kiểm tra lại",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.close()
                    }
                  });
                  return;
            }else{
                Swal.fire({
                    title: "Thành công",
                    text: "Đăng ký thành công, hãy chuyển đến trang đăng nhập",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.close()
                    }
                  });
                  return
            }
        })
        .catch(err=>console.log('err ',err))
    }

    const SignIn = async (e)=>{
        e.preventDefault()
        let Mail = e.target.Mail.value
        let Password = e.target.Password.value
        if (!Password || !Mail){
            Swal.fire({
                title: "Lỗi",
                text: "Vui lòng nhập thông tin",
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.close()
                }
              });
            return;
        }
        // đăng ký tài khoản 

        const body ={
            Mail:Mail,
            Password:Password
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };

        let resp = await fetch(baseUrl+'/user/signIn',requestOptions)
        .then(response=>{
            return response.json()
        })        
        .then(res=>{
            if (!res.Token){
                Swal.fire({
                    title: "Lỗi",
                    text: "Thông tin đăng nhập không chính xác, vui lòng kiểm tra lại",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.close()
                    }
                  });
                  return;
            }else{
                setStorage(res)
                navigate("/");
            }
        })
        .catch(err=>console.log('err ',err))
        
    }

    const setStorage = (data)=>{
        localStorage.setItem('feaer_login_info',JSON.stringify(data))
    }
    return {
        SignUp,
        SignIn,
    }
}

export default Hooks;
