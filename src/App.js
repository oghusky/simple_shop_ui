import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppContext } from './store';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UpdateUser from './pages/UpdateUser';
import MainNav from './components/Headers/MainNav';
import Footer from './components/Footer'
import decode from 'jwt-decode'
function App() {
  // state dependencies
  const [user, setUser] = useState({});
  const [token, setToken] = useState("")
  const state = { user, setUser, token, setToken }

  // get localstorage items on load
  useEffect(() => {
    const loginCheck = localStorage.getItem('ShopEZToken');
    const user = localStorage.getItem('ShopEZUser');
    if (loginCheck) {
        setToken(loginCheck);
        setUser(JSON.parse(user));
    }
    const isExpired = decode(JSON.parse(loginCheck));
    const exDate = isExpired.exp;
    const date = Math.floor((new Date().getTime())/1000);
    console.log("current date is less than jwt exp date: ",date < exDate)
}, []);

  return (
    <AppContext.Provider value={state}>
      <Router>
        <MainNav />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/signup"} component={SignUp}/>
          <Route exact path={"/login"} component={Login}/>
          <Route exact path={"/updateme"} component={UpdateUser}/>
        </Switch>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;