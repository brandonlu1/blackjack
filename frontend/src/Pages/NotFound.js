import { useState, useEffect } from 'react';
import '../CSS/Assets/assets.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Components/NavBar';

export default function NotFound(props){
    return(<div className='container'>
        <NavBar/>
        <div className='title'>Sorry, we couldn't find that page :(</div>
    </div>)
}