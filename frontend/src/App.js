import Home from './Pages/Home';
import Game from './Pages/Game';
import Bet from './Pages/Bet';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Leaderboard from './Pages/Leaderboard';
import NavBar from './Components/NavBar';
import NotFound from './Pages/NotFound';
import {useState, useEffect, Fragment } from 'react';
 import {BrowserRouter as Router, Route, Routes, Redirect, useNavigate, Navigate} from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser !== null) {
       setLoggedIn(true)
      console.log("logged in "+loggedIn)
    }
    }, []);

  return (
    <Router >
      {!(loggedIn !== null) ? 
      <Routes>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="*" element={<Navigate replace to="/login"/>}/>
      </Routes>
      :
      <>
      <Routes>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/bet" element={<Bet page="blackjack"/>}/>
        <Route exact path="/blackjack" element={<Game/>}/>
        <Route exact path="/leaderboard" element={<Leaderboard/>}/>
        <Route exact path="*" element={<NotFound/>}/>

      </Routes>
      </>
      }
      
     </Router>
  );
}

export default App;
