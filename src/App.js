import React, { useState, useEffect } from "react"
import './App.css';
import  Navbar  from "./components/layout/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Axios from "axios"
import Home from "./pages/Home"
import Reports from "./pages/Reports"
import ProfilePage from "./components/profile/ProfilePage"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import UserContext from "./components/context/UserContext"

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "" ;
      } 

      const tokenRes = await Axios.post(
        "http://localhost:5000/apiv1/vendors/tokenIsValid", null,
        {
          headers: { "x-auth-token": token }
        }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(`http://localhost:5000/apiv1/vendors/1`, {
          headers: { "x-auth-token": token }
        })
        setUserData({
          token,
          user: userRes.data
        })
      }
    }
    checkLoggedIn();
  }, [])

  return (
    <>
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/reports" component={Reports} />  
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;
