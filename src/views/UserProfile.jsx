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
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import {ManageUsers} from 'components/ManageUsers/ManageUsers'
import axios from 'axios';
import { BASE_URL } from 'components/constants';

import { useState } from "react";

export default  () => {
  const [reloadData, setReloadData] = useState(true)
  const [userDetails, setUserDetails] = useState({})
    
  const createUser = () => {
    axios({
      method: 'PUT',
      url: BASE_URL,
      data: userDetails,
      headers: {
        'Content-Type': 'application/json',
        //   'Authorization': 'Basic ' + userpass
      }
    }).then(result => {
      setReloadData(!reloadData)
      console.log("insert process done", result)
    })
  }

  const onInputChange = event => {
    setUserDetails({
      ...userDetails,
      [event.target.id]: event.target.value
    });
  }

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Add User"
                content={
                  <div>
                  <form>
                    <FormInputs
                      ncols={["col-md-5", "col-md-3"]}
                      properties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          onChange: onInputChange,
                          id:"username"
                        },
                        {
                          label: "Password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Password",
                          onChange: onInputChange,
                          id:"password"
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "<username>@itcc.co"
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          defaultValue: ""
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          defaultValue: ""
                        }
                      ]}
                    />
                    </form>
                    <Button bsStyle="info" pullRight fill type="submit" onClick={createUser}>
                      Add User
                    </Button>
                    <div className="clearfix" />
                    </div>
                }
              />
            </Col>
            <Col md={12}>
            <Card
                title="Modify Users"
                content={
                  <ManageUsers reloadData={reloadData}/>
                }
              />
              </Col>
          </Row>
        </Grid>
      </div>
    );
}

