import { useState,useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/leaderboard.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default function Leaderboard(props){
    return(<div className='container'>
        <NavBar/>
        <div className='title'>LEADERBOARD</div>

    </div>)
}