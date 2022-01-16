import '../CSS/Pages/game.css';
import '../CSS/Assets/assets.css';
import {useState, useEffect, useCallback} from 'react';
import Card from '../Components/Card';
import Modal from '../Components/Modal';
export default function Game(){
    const [deck, setDeck] = useState([])
    const [player, setPlayer] = useState([])
    const [dealer, setDealer] = useState([])
    const [playerValue, setPlayerValue] = useState(0)
    const [dealerValue, setDealerValue] = useState(0)
    const [playerAce, setAce] = useState(0)
    const [dealerAce, setDealerAce] = useState(0)
    const [win, setWin] = useState()
    
    const[modalOpen, setModalOpen] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(()=>{
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(response => {
            setDeck(response.cards.slice(5))
            setDealer(response.cards.slice(0,2))
            initializeDealer(response.cards.slice(0,2))
            //Is not adding second card for some reason
            setPlayer(response.cards.slice(2,3))
            initializePlayer(count(response.cards.slice(2)[0].value))

            //Figure out why this isn't working
        })
    },[])
    
    const initializeDealer = (e) => {
        let card1 = count(e[0].value)
        let v = card1[0]
        let a = card1[1]
        let card2 = count(e[1].value)
        v += card2[0]
        a += card2[1]
        setDealerAce(a)
        setDealerValue(v)
    }

    const initializePlayer = (e) => {
        //e = value of card
        let card1 = count(e)
        let v = card1[0]
        let a = card1[1]
        setAce(a)
        setPlayerValue(v)
    }

    const deal = (e) => {
        let card = count(deck.slice(0)[0].value)
        if (e === "player"){
            setPlayer(player.concat(deck.slice(0,1)))
            setPlayerValue(playerValue + card[0])
            setAce(playerAce + card[1])
            check(playerValue + card[0])
        }
        else{
            setDealer(dealer.concat(deck.slice(0,1)))
            setDealerValue(dealerValue + card[0])
            setDealerAce(dealerAce + card[1])
            check(dealerValue + card[0])
        }
        setDeck(deck.slice(1,deck.length))
        //Does not take into account the most recent card added
    }

    const count = (e) => {
        let value = 0
        let ace = 0
        //console.log(who," received ",e)
        if (e === "KING" || e === "QUEEN" || e === "JACK"){
            value = 10
        }
        else if (e === "ACE"){
            value = 11
            ace = 1
        }
        else{
            value = parseInt(e)
        }

        
        return [value, ace]
    }

    const check = (pvalue) => {
        if (dealerValue > 21 && dealerAce > 0){
            setDealerValue(dealerValue-10)
            setDealerAce(dealerAce-1)
        }
        if (pvalue > 21 && playerAce > 0){
            setPlayerValue(playerValue-10)
            setAce(playerAce-1)
        }
        if (pvalue > 21 && playerAce === 0){
            setMessage("Sorry, you lost :(")
            localStorage.removeItem('bet')
            setModalOpen(true)
        }
        //console.log("CHECK! dealer value: ", dealerValue, ", player value: ", playerValue)
    }

    const play = () => {
        //console.log("CHECK! dealer value: ", dealerValue, ", player value: ", playerValue)
        if (dealerValue < 17){
            deal("dealer")
        }
        if (dealerValue > 21){
            setMessage("Congratulations, you won!")
            setWin(true)
            claimBet()
            return
        }
        if (dealerValue >= playerValue){
            setMessage("Sorry, you lost :(")
            localStorage.removeItem('bet')
         }
        else{
            setMessage("Congratulations, you won!")
            setWin(true)
            claimBet()
         }
        setModalOpen(true)
    }

    const claimBet = () => {
        const playerBet = parseInt(localStorage.getItem(localStorage.key('bet'))) *(-2)
        const username = localStorage.getItem("user")
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
                localStorage.removeItem('bet')
            }
        })
        .catch((error)=>{
            console.log("error: ",error)
        })
    }

    return(
    <div className='container'>
        <Modal modalOpen={modalOpen} message = {message}/>
        <div className='title' style={{marginTop:'2vh'}}>BLACK JACK</div>
        <div className='tag'>DEALER</div>
        <div className='game--cards'>
            {dealer.map(card => <Card image={card.image} value={card.value}/>)}
        </div>

        <div className='tag'>PLAYER</div>
        <div className='game--cards'>
            {player.map(card => <Card image={card.image} value={card.value}/>)}
        </div>
        <div>
            <button className="button--default" onClick={()=>deal("player")}>HIT</button>
            <button className="button--default" onClick={play}>PLAY</button>
        </div>
    
    </div>)
}