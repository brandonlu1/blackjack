import { useState,useEffect, useContext } from 'react';
import NavBar from '../Components/NavBar';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/signup.css';
import { useNavigate } from 'react-router-dom';

export default function Settings(){
    const [username, setUsername] = useState(localStorage.getItem("user"))
    const [balance, setBalance] = useState(0)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(()=>{
        fetch('http://localhost:5000/getbets', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({username})})
        .then(res => res.json())
        .then(response => { setBalance(response.balance)})
    },[])


    
    const savePassword = () => {
        const username = localStorage.getItem("user")
        console.log(password)
        console.log(confirmPassword)
        if (password === confirmPassword){
            fetch('http://localhost:5000/settings',{
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({username, password})}) 
            .then(res => document.location.reload())
            .catch((error)=>{
                console.log("error: ",error)
            })
        }
    }

    const navigate = useNavigate()

    return(<div className='container'>
        <NavBar/>
        <div className='title'>{localStorage.getItem("user")}</div>
        <div className='subtitle'>{balance}</div>

        <div className='form--input'>
            <div className='form--tag'>RESET PASSWORD</div>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
        </div>
        <div className='form--input'>
            <div className='form--tag'>CONFIRM PASSWORD</div>
            <input type="password" onChange={e=>setConfirmPassword(e.target.value)}/>
            <p className='subtext' style={{textAlign:'right', cursor:'pointer'}} onClick={()=>{navigate('/signup')}}>Forgot Password?</p>
        </div>
        <button className='button--form' onClick={savePassword}>Save Changes</button>
       
    </div>)
}