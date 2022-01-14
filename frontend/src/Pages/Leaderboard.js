import { useState, useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/leaderboard.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import LeaderboardCard from '../Components/LeaderboardCard';

export default function Leaderboard(props){
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/leaderboard')
        .then(res => res.json())
        .then(response => {
             setUsers(response)
         })
    },[])

    return(<div className='container'>
        <NavBar/>
        <div className='title'>LEADERBOARD</div>
        {users.map(user => <LeaderboardCard username = {user.username} balance = {user.balance}/>)}

    </div>)
}   