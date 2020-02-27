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
import React, { useEffect } from "react";
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
import { ManageUsers } from 'components/ManageUsers/ManageUsers'
import axios from 'axios';
import { BASE_URL } from 'components/constants';
import { TimeLogDataTableCDN } from "components/Datatable/TimeLogDataTable"
import TimeField from 'react-simple-timefield';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useState } from "react";

export default (props) => {
  const [reloadData, setReloadData] = useState(true)
  const [fromTime, setFromTime] = useState('09:00')
  const [toTime, setToTime] = useState('17:00')
  const [comment, setComment] = useState('')
  const defaultDate = ((new Date()).getMonth() + 1) + '/' + (new Date()).getDate() + '/' + (new Date()).getFullYear()
  const [date, setDate] = useState(new Date(defaultDate))

  const logDate = () => {
    window.$y('input[name="logDate"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 2018,
      maxYear: parseInt(window.moment().format('YYYY'), 10)
    }, function (start, end, label) {
      var years = start.format('YYYY-MM-DD')
      setDate(years)
    });
  }

  const handleClick = (evt) => {
    evt.preventDefault()
    const userFormDetails = { username: props.username, create_date: (new Date(date)).toISOString().split('T')[0], start_time: fromTime, end_time: toTime, comment: comment }
    axios({
      method: 'POST',
      url: BASE_URL + 'user_ops',
      data: userFormDetails,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        console.log('=========POST=============' + result.data)
        if (result.data == '[[1]]') {
          alert("Already logged for the given date !!")
        }
      })
      .then(() => setReloadData(!reloadData))
  }

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Log Time"
              content={
                <div>
                  <form>
                    <div className="col-md-2">
                      <label>Date</label>
                      <input type="text" name="logDate" class="form-control pull-right" value={defaultDate} />
                      {logDate()}
                    </div>
                    <div className="col-md-2">
                      <label>From Time</label><br />
                      <TimeField value={fromTime} class="form-control" onChange={(evt) => setFromTime(evt.target.value)} style={{"width":"100%"}} />
                    </div>
                    <div className="col-md-2">
                      <label>To Time</label><br />
                      <TimeField value={toTime} class="form-control" onChange={(evt) => setToTime(evt.target.value)}  style={{"width":"100%"}}/>
                    </div>
                    <div className="col-md-3">
                      <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onInit={editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setComment(data)
                          console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                          console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                          console.log('Focus.', editor);
                        }}
                      />
                    </div>
                    <div className="col-md-2" >
                      <label></label>
                      <Button bsStyle="info" fill block pullRight type="submit" onClick={handleClick}>
                        Log Time
                      </Button>
                    </div>
                  </form>
                  <div className="clearfix" />
                </div>
              }
            />
          </Col>
          <Col md={12}>
            <Card
              title="Login History"
              content={<TimeLogDataTableCDN username={props.username} reloadData={reloadData} />}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

