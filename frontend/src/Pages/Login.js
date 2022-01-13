import { useState,useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/signup.css';
import { useNavigate } from 'react-router-dom'

export default function Login(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

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

        <button className='button--form'>Log In</button>
       
    </div>)
}