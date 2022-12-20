// dependencies
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppContext } from './store';
import decode from 'jwt-decode'
// pages
import Home from './pages/Home';
import SignUp from './pages/User/Login';
import Login from './pages/User/Login';
import UpdateUser from './pages/User/UpdateUser';
import CreateStore from './pages/Store/CreateStore';
import SeeStore from './pages/Store/SeeStore';
import UpdateStoreContact from './pages/Store/UpdateStoreContact';
import CreateProduct from './pages/Products/CreateProduct';
// components
import MainNav from './components/Headers/MainNav';
import Footer from './components/Footer'
// styles
import './App.css';
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
    // ============= save for later ========================
    // const isExpired = decode(JSON.parse(loginCheck));
    // const exDate = isExpired.exp;
    // const date = Math.floor((new Date().getTime())/1000);
    // console.log("current date is less than jwt exp date: ",date < exDate)
  },[]);

  return (
    <AppContext.Provider value={state}>
      <Router>
        <MainNav />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/signup"} component={SignUp} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/updateme"} component={UpdateUser} />
          <Route exact path={"/createstore"} component={CreateStore} />
          <Route exact path={"/store/id/:storeId"} component={SeeStore} />
          <Route exact path={"/store/edit/:storeId"} component={UpdateStoreContact}/>
          <Route exact path={"/product/store/:storeId"} component={CreateProduct}/>
        </Switch>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;