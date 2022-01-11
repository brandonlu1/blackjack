import '../CSS/Pages/game.css';
import '../CSS/Assets/assets.css';
import {useState, useEffect, useCallback} from 'react';
import Card from '../Components/Card';
export default function Game(){
    const [deck, setDeck] = useState([])
    const [player, setPlayer] = useState([])
    const [dealer, setDealer] = useState([])
    const [playerValue, setPlayerValue] = useState(0)
    const [dealerValue, setDealerValue] = useState(0)
    const [hasAce, setAce] = useState(0)
    const [dealerAce, setDealerAce] = useState(0)

    useEffect(()=>{
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(response => {
            setDeck(response.cards)
        })
    },[])
    

    const deal = () => {
        if (!dealer.length){
            setDealer(dealer.concat(deck.slice(0,2)))
            countDealer(deck.slice(0,1)[0].value)
            countDealer(deck.slice(1,2)[0].value)

            setPlayer(player.concat(deck.slice(2,3)))
            countPlayer(deck.slice(2,3)[0].value)
            setDeck(deck.slice(3,deck.length))
        }
        else{
            //Removes card from deck and sets player card deck + value
            setPlayer(player.concat(deck.slice(0,1)))
            countPlayer(deck.slice(0,1)[0].value)
            setDeck(deck.slice(1,deck.length))
            




            if (playerValue > 21 && hasAce > 0){
                alert("You lost :(")
                reset()
            }
            else if (playerValue > 21 && hasAce > 0){
                setPlayerValue(playerValue-10)
                setAce(hasAce-1)
            }
        }
    }

    const play = () => {
        if (dealerValue > 21){
            alert("You won!")
            reset()
            return;
        }
        if (dealerValue >= playerValue){
            alert("You lost :(")
            reset()
        }
        else{
            alert("You won!")
            reset()
        }        
    }

    const countPlayer = (e) => {
        if (e === "KING" || e === "QUEEN" || e === "JACK"){
            setPlayerValue(playerValue + 10)
            return;
        }
        if (e === "ACE"){
            setPlayerValue(playerValue + 11)
            setAce(hasAce + 1)
            return;
        }
        setPlayerValue(playerValue + parseInt(e))
    }

    const countDealer = (e) => {
        if (e === "KING" || e === "QUEEN" || e === "JACk"){
            setDealerValue(playerValue + 10)
            return;
        }
        if (e === "ACE"){
            setDealerValue(playerValue + 11)
            setDealerAce(dealerAce + 1)
        }
        setPlayerValue(playerValue + parseInt(e))
    }

    const reset = () => {
        setAce(0)
        setDealer([])
        setDealerAce(0)
        setDealerValue(0)
        setPlayer([])
        setPlayerValue(0)
    }

    return(
    <div className='container'>
        <div className='title'>BLACK JACK</div>
        <div className='tag'>DEALER</div>
        <div className='game--cards'>
            {dealer.map(card => <Card image={card.image} value={card.value}/>)}
        </div>

        <div className='tag'>PLAYER</div>
        <div className='game--cards'>
            {player.map(card => <Card image={card.image} value={card.value}/>)}
        </div>
        <div>
            <button className="button--default" onClick={deal}>HIT</button>
            <button className="button--default" onClick={play}>PLAY</button>
        </div>
    
    </div>)
}