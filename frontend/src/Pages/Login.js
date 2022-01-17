import { useState,useEffect, useContext } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/signup.css';
import { useNavigate } from 'react-router-dom';



export default function Login(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const Login = (e) => {
        e.preventDefault()
        fetch('http://localhost:5000/login', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({username, password})
        })
        .then((res)=>{
            if (res.status === 200){
                navigate('/')
                document.location.reload()
                localStorage.setItem('user', username)
            }
            if (res.status === 404){console.log("Account not found")}
        })
        .catch((error)=>{console.log("error: ",error)})
    }

    return(<div className='container'>
        <div className='title'>LOG IN</div>
        <div className='form--input'>
            <div className='form--tag'>USERNAME</div>
            <input type="text" onChange={e=>setUsername(e.target.value)}/>
        </div>
        <div className='form--input'>
            <div className='form--tag'>PASSWORD</div>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
            <p className='subtext' style={{textAlign:'right', cursor:'pointer'}} onClick={()=>{navigate('/signup')}}>Don't have an account? Sign up</p>
        </div>

        <button className='button--form' onClick={Login}>Log In</button>
       
    </div>)
}