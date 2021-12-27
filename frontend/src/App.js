import Home from './Pages/Home';
import Game from './Pages/Game';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router >
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/blackjack" element={<Game/>}/>
      </Routes>
    </Router>
  );
}

export default App;
