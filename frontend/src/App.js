import Home from './Pages/Home';
import Game from './Pages/Game';
import Bet from './Pages/Bet';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router >
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/bet" element={<Bet page="blackjack"/>}/>
        <Route exact path="/blackjack" element={<Game/>}/>
      </Routes>
    </Router>
  );
}

export default App;
