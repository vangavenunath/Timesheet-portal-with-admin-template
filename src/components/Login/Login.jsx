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
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    return username.length > 0 && password.length > 0 && !loading;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // const userpass = btoa(userDetails.username + ':' + userDetails.password)
    // setUserDetails({ loading: true })
    checkUser({'username':username, 'password': password})
      .then((result) => {
        console.log(result)
        if ((result['message'] == "")) {
          props.setIsLogin(false)
          props.setIsAdmin(username == "admin")
          props.setUsername(username) 
          setErrorMsg("")
        }
        else {
          setErrorMsg(result['message']);
        }
      })
      .catch(err => alert(err))
      .finally(() => console.log("finally")
      //  setUserDetails({ ...userDetails, loading: false })
      )
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
                  onChange: (event) => setUsername(event.target.value)
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
                  onChange: (event) => setPassword(event.target.value)
                }
              ]}
            />
            {errorMsg}
            <Button bsStyle="info" fill type="submit" disabled={!validateForm()} onClick={handleSubmit}>
              Log In
              </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
