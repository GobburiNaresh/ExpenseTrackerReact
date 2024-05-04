import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/ForgotPassword/ForgotPasssword';
import ExpenseTracker from './Components/ExpenseTracker/ExpenseTracker';

function App() {
  return (
   <Router>
    <Switch>
      <Route exact path="/">
        <Signup/>
      </Route>
      <Route path="/Login">
        <Login/>
      </Route>
      <Route path="/password">
        <ForgotPassword/>
      </Route>
      <Route path="/expense">
        <ExpenseTracker/>
      </Route>
    </Switch>
   </Router>
  );
}

export default App;
