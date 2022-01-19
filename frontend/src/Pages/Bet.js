import { useEffect } from 'react';
import '../CSS/Assets/assets.css';
import '../CSS/Pages/game.css';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Slider, Box} from '@mui/material';

export default function Bet(props){
    const [balance, setBalance] = useState(0)
    const [ORIGINAL, setOriginal] = useState(0)
    const [playerBet, setBet] = useState(0)
    const [invalidBet, setInvalidBet] = useState(false)
    const [username, setUser] = useState(localStorage.getItem("user"))

    useEffect(()=>{
        fetch('http://localhost:5000/getbets', {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({username})})
        .then(res => res.json())
        .then(response => { setBalance(response.balance)
             setOriginal(response.balance)})
    },[])

    const sliderBet = (e) => {
        setBalance(ORIGINAL-e.target.value)
        setBet(e.target.value)
    }
    
    const betPlus = (e) => {
        if (balance <= 0){
        setInvalidBet(true)
    }
        else{
            setBet(playerBet+e)
            setBalance(balance-e)
            setInvalidBet(false)
        }
    }

    const betMinus = (e) => {
        if (playerBet <=0){
        return
        }
        else{
            setBet(playerBet-e)
            setBalance(balance+e)
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
        <div className='tag mt4'>BALANCE:{balance}</div>
        <div className='tag'>BET: {playerBet}</div>
        <Box sx={{width:'475px', marginBottom:'2vh'}}>
        <Slider className="slider--style"
        defaultValue={playerBet}
        valueLabelDisplay="auto"
        value={playerBet}
        max={ORIGINAL}
        color="primary"
        onChange={(e)=>sliderBet(e)}
        />
        </Box>
        <div className="mb8">
        <button className="button--default" onClick={()=>betMinus(500)}>BET -500</button>
        <button className="button--default" onClick={()=>betMinus(100)}>BET -100</button>
            <button className="button--default" onClick={()=>betPlus(100)}>BET +100</button>
            <button className="button--default" onClick={()=>betPlus(500)}>BET +500</button>

        </div>
        {invalidBet ? <p className="tag">Sorry, you do not have sufficient funds.</p>:null}
        <button className="button--big" onClick={submitBet} >PLAY</button>



    </div>)
}