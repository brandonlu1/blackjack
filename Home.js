import '../CSS/Pages/home.css';
import React, { Component } from 'react';

class Button extends Component{
    constructor(){
        super();
        this.state = {text: "Click Me!"};
    }
    colorChange = () =>{
        this.setState({text: "Clicked!"});
    }
    render(){
        return <button onClick = {this.colorChange}>
            {this.state.text}
        </button>
    }
}
export default function Home(){
    return(
    <div>
        <Button/>
        <Button/>
    </div>)
}