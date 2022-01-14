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
    
    const[modalOpen, setModalOpen] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(()=>{
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(response => {
            setDeck(response.cards.slice(5))

            setDealer(response.cards.slice(0,2))
            count(response.cards.slice(0)[0].value, "dealer")
            //Is not adding second card for some reason
            count(response.cards.slice(1)[0].value, "dealer")

            setPlayer(response.cards.slice(3,4))
            count(response.cards.slice(2)[0].value,"player")

            //Figure out why this isn't working
        })
    },[])
    

    const deal = (e) => {
        if (e === "player"){
            setPlayer(player.concat(deck.slice(0,1)))
        }
        else{
            setDealer(player.concat(deck.slice(0,1)))
        }
        setDeck(deck.slice(1,deck.length))
        count(deck.slice(0,1)[0].value,e)

    }

    const count = (e, who) => {
        console.log(e)
        console.log(who)
        let value = 0
        //console.log(who," received ",e)
        if (e === "KING" || e === "QUEEN" || e === "JACK"){
            value = 10
        }
        else if (e === "ACE" && who === "player"){
            setPlayerValue(playerValue + 11)
            setAce(playerAce + 1)
            return
        }
        else if (e === "ACE" && who === "dealer"){
            setDealerValue(dealerValue + 11)
            setDealerAce(dealerAce + 1)
            return
        }
        else{
            value = parseInt(e)
        }

        if (who === "player"){
             setPlayerValue(playerValue + value)
        }
        else{
            setDealerValue(dealerValue + value)
        }
        check()
    }

    const check = () => {
        if (dealerValue > 21 && dealerAce > 0){
            setDealerValue(dealerValue-10)
            setDealerAce(dealerAce-1)
        }
        if (playerValue > 21 && playerAce > 0){
            setPlayerValue(playerValue-10)
            setAce(playerAce-1)
        }
        if (playerValue > 21 && playerAce === 0){
            setMessage("Sorry, you lost :(")
            setModalOpen(true)
        }
        console.log("player value: ", playerValue)
        console.log("DEALER: ", dealerValue)
    }



    const play = () => {
        if (dealerValue < 17){
            deal("dealer")
        }
        if (dealerValue > 21){
            setMessage("Congratulations, you won!")
            return
        }
        if (dealerValue >= playerValue){
            setMessage("Sorry, you lost :(")
         }
        else{
            setMessage("Congratulations, you won!")
         }
        setModalOpen(true)
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
        <button className="button--default" onClick={()=>console.log("player: ",playerValue," dealer: ", dealerValue)}>check</button>

        <div>
            <button className="button--default" onClick={()=>deal("player")}>HIT</button>
            <button className="button--default" onClick={play}>PLAY</button>
        </div>
    
    </div>)
}