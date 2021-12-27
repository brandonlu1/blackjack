import '../CSS/Pages/game.css';
import {useState, useEffect, useCallback} from 'react';
import Card from '../Components/Card';
export default function Game(){
    const [deck, setDeck] = useState([])
    const [balance, setBalance] = useState(100)
    const [player, setPlayer] = useState([])
    const [dealer, setDealer] = useState([])
    /**
    What I need:

    a deck
    a card

    a shuffle function

    a way to deal cards
    a way for the dealer to play the game

    the game logic itself

    check for deck API or make own deck

    */

    useEffect(()=>{
        fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
        .then(res => res.json())
        .then(response => {
            setDeck(response.cards)
        })
    },[])
    
    const deal = () => {
        setPlayer(player.concat(deck.slice(0,1)))
        setDeck(deck.slice(1,deck.length))
        console.log(player)
    }

    const bet = () => {
        setBalance(balance+100)
        console.log(balance)
    }




    return(
    <div className='game--container'>
        game
        <button onClick={() => console.log(deck)}>this button is for when u place ur bet (maybe)</button>
        <button onClick={deal}>
            deal card
        </button>

        {player.map(card => <Card image={card.image} value={card.value}/>)}

        <button onClick={()=> console.log("player mapped:",player)}>
            test
        </button>
    
    </div>)
}