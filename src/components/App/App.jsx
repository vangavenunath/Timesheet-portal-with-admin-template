import React, {useEffect, useState} from 'react';
import Login from 'components/Login/Login'
import {UserHome} from 'components/UserHome/userhome'
import AdminLayout from "layouts/Admin.jsx";
import {DatatableCDN} from "components/Datatable/Datatable"
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
      {!isLogin && !isAdmin && <UserHome username={username}/>}
      {!isLogin && isAdmin && <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>}      
  {/* <DatatableCDN/> */}
    </div>
  );
}

export default App;
