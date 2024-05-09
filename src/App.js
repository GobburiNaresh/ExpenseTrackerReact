import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/ForgotPassword/ForgotPasssword';
import ExpenseTracker from './Components/ExpenseTracker/ExpenseTracker';
import ContactProfile from './Components/ExpenseTracker/ContactProfile';
import {AuthContextProvider} from './Components/store/auth-context';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup/>
          </Route>
          <Route exact path="/Login">
            <Login/>
          </Route>
          <Route exact path="/password">
            <ForgotPassword/>
          </Route>
          <Route exact path="/expense">
            <ExpenseTracker/>
          </Route>
          <Route exact path="/contact">
            <ContactProfile/>
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
   
  );
}

export default App;
