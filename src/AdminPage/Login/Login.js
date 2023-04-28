import React, { useEffect, useState } from 'react'
import './../Styles/App.scss'
import './../Styles/Admin.scss'
// import '../Styles/Admin.css'
import bg from './login-bg.jpg'
import Axios from 'axios' 
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Div100vh from 'react-div-100vh';
import {useNavigate } from 'react-router-dom'

function Login(props) { 
    const navigate = useNavigate ()
    const baseUrl = process.env.REACT_APP_API_URL;

    const [arrSuccess, setArrSuccess] = useState([]);
    const [arrErr, setArrErr] = useState([]); 

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=>{
        if (localStorage.getItem('errLogin')) {
            setArrErr([localStorage.getItem('errLogin')]);
        }
        setTimeout(()=>{
            localStorage.removeItem('errLogin')
            setArrErr([])
        }, 3000)
    }, [])
    
    const handleOnSubmit = (event) => {
        event.preventDefault(); 
        Axios.post(baseUrl+'/user/signInAdmin', {
            Mail: email,
            Password: password
        })
        .then(res => {
            console.log('res ne',res)
            setArrSuccess(["Login success!"]) 
            setArrErr([]);
            localStorage.setItem('token', res.data.Token);
            localStorage.setItem('user-id', res.data.User._id);
            navigate('/admin/dashboard')
        })
        .catch(err => {
            let res = {data:{token:'',user:{}}}
            err={response:{}}
            setArrErr([err.response.data]);
            setArrSuccess([]) 
            setArrSuccess(["Login success!"]) 
            setArrErr([]);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user-id', res.data.user._id);
            navigate('/admin/dashboard')
        }) 
    }

    let uniqueErr, uniqueSuccess = [];
    if (arrErr.length > 0) {
        uniqueErr = arrErr.filter(function(item, pos) {
            return arrErr.indexOf(item) === pos;
        })
    }
    if (arrSuccess.length > 0) {
        uniqueSuccess = arrSuccess.filter(function(item, pos) {
            return arrSuccess.indexOf(item) === pos;
        })
    }

    return (
        <div className='AdminLogin'>
            <div className="Login">
            <img className="login-bg" src={bg} alt=""></img>
            <div className="login-overlay flex-center">
                <div className="login-box flex">
                    <div className="login-left flex-center flex-col">
                        <img src="https://demo.uix.store/sober/wp-content/themes/sober/images/logo.svg" alt="logo" width="50%"></img>
                        <div className="login-title">Login To Admin Dashboard</div>
                        <div className="login-err flex-center flex-col login-arr-admin" 
                            style={{
                                width: '80%', padding: '0', 
                                // heigh    t: '40px'
                            }}>
                            { uniqueErr && 
                                <div style={{width: '100%', padding: '0'}}>
                                    {
                                        uniqueErr.map((item, index) => {
                                            return(
                                                <div key={index}>
                                                    <FontAwesomeIcon icon={faTimes} style={{ marginRight: '10px', color: 'red'}}/>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                            { uniqueSuccess && 
                                <div style={{width: '100%', padding: '0'}}>
                                    {
                                        uniqueSuccess.map((item, index) => {
                                            return(
                                                <div key={index} className="login-success">
                                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px', color: 'green'}}/>
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <form className="admin-login-form flex-col" onSubmit={handleOnSubmit}>
                            <input 
                                type="text" 
                                placeholder="Email" 
                                value={email}
                                onChange={(event)=>{
                                    setEmail(event.target.value)
                                }}
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(event)=>{
                                    setPassword(event.target.value)
                                }}
                            />
                            <button type="submit" className="btn">Đăng nhập</button>
                        </form>
                    </div>
                    <div className="login-right">
                        <div className="animation-overlay"></div>
                        <img src={bg} alt=""></img>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Login