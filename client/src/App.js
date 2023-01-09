import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Session from "./pages/Session";
import Results from "./pages/Results";
import axios from 'axios';


function App() {

useEffect(() => {
  axios.get(`${process.env.REACT_APP_DB_URL}/health`)
      .then((response) => {
      })
}, []);

  
// axios.defaults.withCredentials = true;


  return (
    <div className="App">
      <Router> 
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/setup/session-id=/:sessionID" exact element={<Setup />} />
          <Route path="/session/session-id=/:sessionID" exact element={<Session />} />
          <Route path="/results/session-id=/:sessionID" exact element={<Results />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
