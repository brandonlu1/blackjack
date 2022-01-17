import { useState,useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/signup.css';
import { useNavigate, BrowserRouter as Router } from 'react-router-dom'

export default function Signup(props){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [balance] = useState(1000)
    const [usernameTaken, setUsernameTaken] = useState(false)

    const verifyPassword = () => {
        if (password !== confirmPassword){
            alert("Sorry, your fields do not match!")
            return true
        }
        else{
            return false
        }
    }

    const createAccount = (e) => {
        //TODO: check for errors
        //Passwords do not match
        //Username is already taken
        e.preventDefault()
        const invalid = verifyPassword();
        if (invalid === false){
            e.preventDefault();
            fetch('http://localhost:5000/signup',{
                method:'POST',
                headers:{ "Content-Type":"application/json",},
                body:JSON.stringify({
                    username,
                    password,
                    balance
                })
            })
            .then((res)=>{
                console.log("res", res.status)
                if (res.status === 200){
                    navigate('/login')
                    setUsernameTaken(false)
                }
                if (res.status === 409){ setUsernameTaken(true)}})
            .catch((error)=>{ console.log("error: ",error)})
        }
    }
    
    const navigate = useNavigate();

    return(<div className='container'>
        <div className='title'>SIGN UP</div>

        <div className='form--input'>
            <div className='form--tag'>USERNAME</div>
            <input type="text" onChange={e=>setUsername(e.target.value)}/>
            {usernameTaken ? <p className='subtext'>Sorry, that username is already taken</p> : null}
        </div>
        <div className='form--input'>
            <div className='form--tag'>PASSWORD</div>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className='form--input'>
            <div className='form--tag'>CONFIRM PASSWORD</div>
            <input type="password" onChange={e=>setConfirmPassword(e.target.value)}/>
            <p className='subtext' style={{textAlign:'right', cursor:'pointer'}} onClick={()=>{navigate('/login')}}>Already have an account? Log in</p>
        </div>
        <button className='button--form' onClick={createAccount}>Create Account</button>
    </div>)
}