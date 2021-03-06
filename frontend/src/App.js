import Home from './Pages/Home';
import Game from './Pages/Game';
import Bet from './Pages/Bet';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Leaderboard from './Pages/Leaderboard';
import Settings from './Pages/Settings';
import NotFound from './Pages/NotFound';
import {useState, useEffect, Fragment } from 'react';
 import {BrowserRouter as Router, Route, Routes, useNavigate, Navigate} from 'react-router-dom';

function App() {
  const [user, setUser ] = useState(localStorage.getItem("user"))

  useEffect(() => {
    setUser(localStorage.getItem("user"))
    console.log(user)
     }, []); 

return(<Router>
  {user===null ?
  <Routes>
  <Route exact path="/signup" element={<Signup/>}/>
  <Route exact path="/login" element={<Login/>}/>
{/**<Route exact path="*" element={<Navigate to="/login"/>}/>*/}
<Route exact path="*" element={<Navigate to="/login"/>}/>
</Routes>
:
<Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/bet" element={<Bet page="blackjack"/>}/>
        <Route exact path="/blackjack" element={<Game/>}/>
        <Route exact path="/leaderboard" element={<Leaderboard/>}/>
        <Route exact path="*" element={<Navigate to="/404"/>}/>
        <Route exact path="/404" element={<NotFound/>}/>
        <Route exact path="/settings" element={<Settings/>}/>
      </Routes>
  }
</Router>)

}

export default App;
