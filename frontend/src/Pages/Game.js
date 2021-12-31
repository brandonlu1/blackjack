import '../CSS/Pages/game.css';
import {useState, useEffect, useCallback} from 'react';
import Card from '../Components/Card';
export default function Game(){
    const [deck, setDeck] = useState([])
    const [balance, setBalance] = useState(10000)
    const [playerBet, setBet] = useState(0)
    const [player, setPlayer] = useState([])
    const [dealer, setDealer] = useState([])
    const [playerValue, setPlayerValue] = useState(0)
    const [dealerValue, setDealerValue] = useState(0)
    const [hasAce, setAce] = useState(false)
    const [dealerAce, setDealerAce] = useState(false)

    useEffect(()=>{
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(response => {
            setDeck(response.cards)
        })
    },[])
    
    const deal = () => {
        //Removes card from deck and sets player card deck + value
        setPlayer(player.concat(deck.slice(0,1)))
        countPlayer(deck.slice(0,1)[0].value)
        setDeck(deck.slice(1,deck.length))
        
        //Game logic?
        if (playerValue > 21 && hasAce === false){
            alert("You lost")
            return;
        }
        if (playerValue > 21 && hasAce === true){
            setPlayerValue(playerValue-10)
            setAce(false)
            return;
        }
        console.log(playerValue) 

    }

    const play = () => {
        if (dealerValue > 21){
            alert("You won!")
            return;
        }
        if (dealerValue >= playerValue){
            alert("You lost")
            return;
        }
        else{
            alert("You won!")
        }
        
    }

    const countPlayer = (e) => {
        console.log(e)
        if (e === "KING" || e === "QUEEN" || e === "JACK"){
            setPlayerValue(playerValue + 10)
            return;
        }
        if (e === "ACE"){
            setPlayerValue(playerValue + 11)
            setAce(true)
            return;
        }
        setPlayerValue(playerValue + parseInt(e))
    }

    const countDealer = (e) => {
        console.log(e)
        if (e === "KING" || e === "QUEEN" || e === "JACk"){
            setDealerValue(playerValue + 10)
            return;
        }
        if (e === "ACE"){
            setDealerValue(playerValue + 11)
            setDealerAce(true)
        }
        setPlayerValue(playerValue + parseInt(e))
    }





    const bet = () => {
        //Find a better place to put this
        if (!dealer.length){
            setDealer(deck.slice(0,1))
            countDealer(deck.slice(0,1)[0].value)
            setDeck(deck.slice(1,deck.length))
        }
        if (balance < 100){
            return;
        }
        setBet(playerBet+100)
        setBalance(balance-100)
    }

    return(
    <div className='game--container'>
        BALANCE:{balance}

        <button onClick={bet}>BET $100</button>
        <button onClick={deal}>HIT</button>
        <button onClick={play}>PLAY</button>
        BET: {playerBet}
        PLAYER  
        <div className='game--cards'>
            {player.map(card => <Card image={card.image} value={card.value}/>)}
        </div>
         DEALER
        <div className='game--cards'>
            {dealer.map(card => <Card image={card.image} value={card.value}/>)}
        </div>
    
    </div>)
}