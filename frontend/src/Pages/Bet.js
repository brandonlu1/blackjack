import { useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/game.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Bet(props){
    const [balance, setBalance] = useState(10000)
    const [playerBet, setBet] = useState(0)

    const bet = () => {
        if (balance < 100){
            return;
        }
        setBet(playerBet+100)
        setBalance(balance-100)
    }

    return(<div className='container'>
        <div className='title'>BETTING</div>
        <div className='tag'>BALANCE:{balance}</div>
        <div>
            <button className="button--default" onClick={bet}>BET +100</button>
            <button className="button--default" onClick={bet}>BET -100</button>
        </div>
        <div className='tag'>BET: {playerBet}</div>
        <button className="button--default" ><Link to={`/${props.page}`} style={{textDecoration:'none', color:'white', fontWeight:'500'}}>PLAY</Link></button>



    </div>)
}