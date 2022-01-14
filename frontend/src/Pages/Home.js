import { useState,useEffect } from 'react';
import '../CSS/Assets/assets.css';
import { useNavigate } from 'react-router-dom';
import GameCard from '../Components/GameCard';
import NavBar from '../Components/NavBar';

const games = [
    {name:"BLACK JACK", to:"/bet"},
    {name:"BLACK JACK", to:"/bet"},
    {name:"BLACK JACK", to:"/bet"},
]

export default function Home(props){
    return(<div className='container'>
        <NavBar/>
        <div className='title'>HOME PAGE</div>
        <div className="mapping">{games.map((game) => <GameCard name={game.name} to={game.to}/>)}</div>
    </div>)
}