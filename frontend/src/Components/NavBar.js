import "../CSS/Components/navbar.css";
import "../CSS/Assets/assets.css";
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';

export default function NavBar() {
const logOut = () => {
  localStorage.clear()
  navigate("/login")
  document.location.reload()
}
const toSettings = () => {
  navigate("/settings")
}
const toHome = () => {
  navigate("/")
}
const toLeaderboard = () => {
  navigate("/leaderboard")
}
const navigate = useNavigate()
  return (
    <div className="navbar--container">
      <div className="navbar--right">
      <p onClick={toHome} className="navbar--tag">Home</p>
      <p onClick={toLeaderboard} className="navbar--tag">Leaderboard</p>
      </div>


      <div className="navbar--right">
      <p onClick={toSettings} className="navbar--tag">Settings</p>
      <p onClick={logOut} className="navbar--tag">Log Out</p>
      </div>
    </div>
  );
}
