import { useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/game.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Bet(props){
    const [balance, setBalance] = useState(0)
    const [playerBet, setBet] = useState(0)
    const [invalidBet, setInvalidBet] = useState(false)
    const [username, setUser] = useState(localStorage.getItem(localStorage.key('user')))

    useEffect(()=>{
        fetch('http://localhost:5000/getbets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
            })
        })
        .then(res => res.json())
        .then(response => {
            setBalance(response.balance)
         })
    },[])
    
    const betPlus = () => {
        if (balance <= 0){
        setInvalidBet(true)
    }
        else{
            setBet(playerBet+100)
            setBalance(balance-100)
            setInvalidBet(false)
        }
    }

    const betMinus = () => {
        if (playerBet <=0){
        return
        }
        else{
            setBet(playerBet-100)
            setBalance(balance+100)
        }
    }

    const submitBet = () => {
        fetch('http://localhost:5000/bet', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                playerBet
            })
        })
        .then((res)=>{
            if (res.status === 200){
                localStorage.setItem('bet', playerBet)
                console.log("Bet submitted")
                navigate('/blackjack')
            }
            if (res.status === 409){
                 console.log("Something went wrong submitting your bet.")
            }
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/blackjack")
    }

    return(<div className='container'>
        <div className='title'>BETTING</div>
        <div className='tag'>BALANCE:{balance}</div>
        <div>
            <button className="button--default" onClick={betPlus}>BET +100</button>
            <button className="button--default" onClick={betMinus}>BET -100</button>
        </div>
        {invalidBet ? <p className="tag">Sorry, you do not have sufficient funds.</p>:null}
        <div className='tag'>BET: {playerBet}</div>
        <button className="button--default" onClick={submitBet} >PLAY</button>



    </div>)
}