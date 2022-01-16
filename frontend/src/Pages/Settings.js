import { useState,useEffect, useContext } from 'react';
import NavBar from '../Components/NavBar';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/signup.css';
import { useNavigate } from 'react-router-dom';

export default function Settings(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=>{
        fetch('http://localhost:5000/leaderboard')
        .then(res => res.json())
        .then(response => {
             setUsername(response)
             console.log(response)
             //This needs to be a new route :/
         })
    },[])

    const navigate = useNavigate()

    return(<div className='container'>
        <NavBar/>
        <div className='title'>USERNAME</div>
        <div className='subtitle'>BALANCE</div>

        <div className='form--input'>
            <div className='form--tag'>RESET PASSWORD</div>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className='form--input'>
            <div className='form--tag'>CONFIRM PASSWORD</div>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
            <p className='subtext' style={{textAlign:'right', cursor:'pointer'}} onClick={()=>{navigate('/signup')}}>Forgot Password?</p>
        </div>

        <button className='button--form' >Save Changes</button>
       
    </div>)
}