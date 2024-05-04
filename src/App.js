import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';

function App() {
  return (
   <Router>
    <Switch>
      <Route path="/">
        <Signup/>
      </Route>
      <Route path="/Login">
        <Login/>
      </Route>
    </Switch>
   </Router>
  );
}

export default App;
