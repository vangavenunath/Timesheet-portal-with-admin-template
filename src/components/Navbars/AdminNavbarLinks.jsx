/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import {getNotifications} from 'actions/API'
import Sidebar from 'components/Sidebar/Sidebar'
import { Link, useHistory } from "react-router-dom";
const AdminNavbarLinks = () => {

  const [notifications, setNotifications] = useState([])
  
  useEffect(() => {
    getNotifications().then( result => setNotifications(result))
  })

  const history = useHistory()

    const logout = () => {
      window.location.href = '/';
      return false;
  }

const handleNotificationClick = () => {
   history.push('/admin/notifications')
}

    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        {notifications.length !== 0 && <span className="notification">{notifications.length}</span>}
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            {notifications.map((notif) => {
                    return (<MenuItem eventKey={2.1} onClick={handleNotificationClick}>{notif[0]} applied leave for {notif[1]} date</MenuItem>)
                  })}
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={3} href="#" onClick={logout}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
}

export default AdminNavbarLinks;
