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
import React, { useEffect, useState } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import { StyledTick, StyledClose } from 'components/styles/commonStyles'
import axios from 'axios';
import { BASE_URL } from 'components/constants';
import Button from "components/CustomButton/CustomButton.jsx";
import {getNotifications} from 'actions/API'

const Notifications = () => {
  const [reloadData, setReloadData] = useState(true)
  const [notifications, setNotifications] = useState([])

  useEffect(() =>{
    getNotifications().then( result => setNotifications(result))
  },[reloadData])

  const handleTick = (evt) => {
    console.log(evt.target.name)
    axios({
      method: 'PUT',
      url: BASE_URL + 'leaves',
      data: {username:evt.target.name.split('|')[0], leave_date:evt.target.name.split('|')[1], status:'Approved'},
      headers: { 'Content-Type': 'application/json' }
    }).then((result) => setReloadData(!reloadData))
  }
  
  const handleClose = (evt) => {
    console.log(evt.target.name)
    axios({
      method: 'PUT',
      url: BASE_URL + 'leaves',
      data: {username:evt.target.name.split('|')[0], leave_date:evt.target.name.split('|')[1], status:'Rejected'},
      headers: { 'Content-Type': 'application/json' }
    }).then((result) => setReloadData(!reloadData))
  }

  return (
    <div className="content">
      <Grid fluid>
        <div className="card">
          <div className="header">
            <h4 className="title">Notifications</h4>
            <p className="category">
              Leave Notifications
              </p>
            </div>
            <div className="content">
              <Row>
                <Col md={12}>
                  {notifications.map((notif) => {
                    return (<Alert bsStyle="info">
                    <StyledTick type="button" aria-hidden="true" onClick={handleTick} name={notif[0] +'|'+ notif[1]}>
                      Approve &#x2713;
                    </StyledTick>
                    <StyledClose type="button" aria-hidden="true" onClick={handleClose} name={notif[0]+'|'+notif[1]}>
                      Reject &#x2715;
                    </StyledClose>
                  <span>{notif[0]} applied leave for {notif[1]} date</span>
                  </Alert>)
                  })}
                </Col>
              </Row>
            </div>
            </div>
        </Grid>
        </div>
        );
      }
    
    

export default Notifications;
