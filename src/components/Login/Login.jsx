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

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      errorMsg: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 && !this.state.loading;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const userpass = btoa(this.state.username + ':' + this.state.password)
    this.setState({ loading: true })
    axios({
      method: 'POST',
      url: BASE_URL,
      data: this.state,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + userpass
      }
    })
      .then((response) => {
        if (response.data.toString() !== '') {
          this.props.setIsLogin(false)
          this.props.setIsAdmin(this.state.username == "admin")
          this.props.setUsername(this.state.username)
          this.setState({ errorMsg: "" })
        }
        else {
          this.setState({ errorMsg: "Invalid username or password" })
        }
      })
      .catch(err => alert(err))
      .finally(() => this.setState({ loading: false }))
  }

  render() {
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
                    onChange: this.handleChange
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
                    onChange: this.handleChange
                  }
                ]}
              />
              {this.state.errorMsg}
              <Button bsStyle="info" fill type="submit" disabled={!this.validateForm()} onClick={this.handleSubmit}>
                Log In
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}