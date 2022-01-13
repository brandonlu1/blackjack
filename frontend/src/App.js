import Home from './Pages/Home';
import Game from './Pages/Game';
import Bet from './Pages/Bet';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Leaderboard from './Pages/Leaderboard';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router >
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/bet" element={<Bet page="blackjack"/>}/>
        <Route exact path="/blackjack" element={<Game/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/leaderboard" element={<Leaderboard/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
