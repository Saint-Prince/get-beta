import React, { useState, useEffect } from "react"
import './App.css';
import  Navbar  from "./components/layout/Navbar"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Axios from "axios"
import Home from "./pages/Home"
import PageNotFound from "./pages/PageNotFound"
import Reports from "./pages/Reports"
import Content from "./components/contents/Content"
import MyContents from "./components/contents/MyContents"
import ContentView from "./components/contents/ContentView"
import EnrolledUsers from "./components/contents/EnrolledUsers"
import ContentEnroll from "./components/contents/ContentEnroll"
import CreateContent from "./components/contents/CreateContent"
import EditContent from "./components/contents/EditContent"
import CreateFile from "./components/contentfile/CreateFile"
import FileStream from "./components/contentfile/FileStream"
import FilePreview from "./components/contentfile/FilePreview"
import AllContents from "./components/contents/AllContents"
import EnrolledContents from "./components/contents/EnrolledContents"
import ProfilePage from "./components/profile/ProfilePage"
import EditProfile from "./components/profile/EditProfile"
import ViewProfile from "./components/profile/ViewProfile"
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
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/profile/edit/:id" component={EditProfile} />
            <Route exact path="/profile/view/:id" component={ViewProfile} />
            <Route exact path="/contents" component={Content} />  
            <Route exact path="/contents/view/:id" component={ContentView} />  
            <Route exact path="/contents/enrollers/:id" component={EnrolledUsers} />  
            <Route exact path="/contents/enroll/:id" component={ContentEnroll} />  
            <Route exact path="/contents/edit/:id" component={EditContent} />  
            <Route exact path="/contents/create" component={CreateContent} />  
            <Route exact path="/profile/mycontents/:id" component={MyContents} />  
            <Route exact path="/contents/newFile/:id" component={CreateFile} />  
            <Route exact path="/contentfile/view/:id" component={FileStream} />  
            <Route exact path="/contentfile/preview/:id" component={FilePreview} />  
            <Route exact path="/contents/enrolled" component={EnrolledContents} />  
            <Route exact path="/explore" component={AllContents} />  
            <Route exact path="/reports" component={Reports} />  
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
    </>
  );
}

export default App;
