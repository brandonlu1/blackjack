import { useState,useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Components/leaderboardcard.css';
import { useNavigate } from 'react-router-dom'

export default function LeaderboardCard(props){
    return(<div className='leaderboard--card--container'>
        <div className='leaderboard--card--tag'>{props.username}</div>
        <div className='leaderboard--card--tag'>{props.balance}</div>
    </div>)
}