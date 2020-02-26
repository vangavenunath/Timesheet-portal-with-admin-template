import React, {useEffect, useState} from 'react';
import Login from 'components/Login/Login'
import UserLayout from 'layouts/UserLayout.jsx'
import AdminLayout from "layouts/Admin.jsx";
import AdminHome from "views/AdminHome"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState(false)

  useEffect(() => {
    // getConnection().then(result => console.log(result))
  })

  return (
    <div className="App">
      {isLogin && <Login setIsAdmin = {setIsAdmin} setIsLogin={setIsLogin} setUsername={setUsername}/>}
      {!isLogin && !isAdmin &&  <BrowserRouter>
    <Switch>
      <Route path="/UserLayout" username={username} render={props => <UserLayout {...props} />} />
      <Redirect from="/" to="/UserLayout/dashboard" />
    </Switch>
  </BrowserRouter>}
      {!isLogin && isAdmin && <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>}      
  {/* <AdminHome/> */}
    </div>
  );
}

export default App;
