import React, { Component } from "react";
import axios from 'axios';
// import { Default } from 'react-awesome-spinners'
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import './login.css'
import { BASE_URL } from "../constants";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { Container } from "semantic-ui-react";
import { checkUser } from 'actions/API'
import { useState } from "react";

export default (props) => {
  const [userDetails, setUserDetails] = useState({ username: "", password: "", loading: false, errorMsg: "" })

  const validateForm = () => {
    return userDetails.username.length > 0 && userDetails.password.length > 0 && !userDetails.loading;
  }

  const handleChange = (event) => {
    setUserDetails(prev => ({ 
      ...prev,
      [event.target.id]: event.target.value,
  }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const userpass = btoa(userDetails.username + ':' + userDetails.password)
    setUserDetails({ loading: true })
    checkUser(userDetails)
      .then((response) => {
        if (response.data.toString() !== '') {
          props.setIsLogin(false)
          props.setIsAdmin(userDetails.username == "admin")
          props.setUsername(userDetails.username)
          setUserDetails({ ...userDetails, errorMsg: "" })
        }
        else {
          setUserDetails({ ...userDetails, errorMsg: "Invalid username or password" })
        }
      })
      .catch(err => alert(err))
      .finally(() => setUserDetails({ ...userDetails, loading: false }))
  }

  return (
    <div className="Login">
      <Container fluid={true}>
        <Row>
          <Col>
            <h1>Welcome to Timesheet Portal</h1>
            <FormInputs
              ncols={["col-md-5"]}
              properties={[
                {
                  label: "Username",
                  type: "text",
                  id: "username",
                  bsClass: "form-control",
                  placeholder: "Enter Username",
                  defaultValue: "",
                  onChange: handleChange
                }
              ]}
            />
            <FormInputs
              ncols={["col-md-5"]}
              properties={[
                {
                  label: "Password",
                  type: "password",
                  id: "password",
                  bsClass: "form-control",
                  placeholder: "Enter Password",
                  defaultValue: "",
                  onChange: handleChange
                }
              ]}
            />
            {userDetails.errorMsg}
            <Button bsStyle="info" fill type="submit" disabled={!validateForm()} onClick={handleSubmit}>
              Log In
              </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
