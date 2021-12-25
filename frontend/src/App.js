import Home from './Pages/Home';
import {BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router >
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
