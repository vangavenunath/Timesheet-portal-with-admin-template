import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from '../constants';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DataTable from 'react-data-table-component';
import DatePicker from 'react-date-picker';
import { DropdownMultipleSelection } from './MultiDropdown'
import { Grid, Row, Col, Table } from "react-bootstrap";

export const TimeSheets = (props) => {

  const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  const formatDate1 = (date) => {
    return (pad(parseInt((new Date(date)).getMonth())+1,2) + '/'+pad((new Date(date)).getDate(),2)+'/'+(new Date(date)).getFullYear());  
  }

  const [tableDataItems, setTableDataItems] = useState([{ username: '', create_date: '', start_time: '', end_time: '', comment: '' }])
  const [users, setUsers] = useState([])
  const defaultDate = formatDate1(Date.now() - 24 * 60 * 60000);
  const [fromDate, setFromDate] = useState(defaultDate)
  const [toDate, setToDate] = useState(defaultDate)

  const formatDate = (date) => {
    return (new Date(date)).getFullYear()+'-'+pad((parseInt((new Date(date)).getMonth())+1),2) + '-'+pad((new Date(date)).getDate(),2);  
  }


  useEffect(() => {
    daterange()
    getLoginTimes()
    console.log(tableDataItems)
  }, [users, fromDate, toDate])


  const daterange = () => {
    window.$y('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      setFromDate(start)
      setToDate(end)
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    })
  }

  const getLoginTimes = () => {
    
    let table = window.$x('#table_id').DataTable({
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf'
      ],
      destroy:true,
      XSS: false
  });
    
    const requestData = { 'username': users, 'from_date': formatDate(fromDate), 'to_date': formatDate(toDate) }
    console.log('=======requestData=========', users)
    axios({
      method: 'POST',
      url: BASE_URL + 'adminlog',
      data: requestData,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(result => {
        console.log(result)
        const arr1 = eval(result.data)
        let arr = []
        console.log("===================arr1=========", arr1, typeof (arr1))
        for (var row = 0; row < arr1.length; row++) {
          arr.push([arr1[row][0], arr1[row][1], arr1[row][2], arr1[row][3], arr1[row][4]
          ])
          // <CKEditor
          //     editor={ClassicEditor}
          //     config={{ toolbar: [] }}
          //     disabled={true}
          //     data={arr1[row][4]} />
        }
        return arr
      })
      .then(arr => {
        table.clear()
        table.rows.add(arr).draw();
    })
      .catch(error => console.warn(error))
      return table;
  }

  
  return (
    <div>
      <Grid>
        <Row>
          <Col md={3}>
            <label>Select User(s) </label>&nbsp;&nbsp;
            <DropdownMultipleSelection setUsers={setUsers} />
          </Col>
          <Col md={3}>
            <label>Select Date Range </label>&nbsp;&nbsp;
            <input type="text" name="daterange" class="form-control pull-right" value={formatDate1(fromDate)+' - '+formatDate1(toDate)} />
            
          </Col>
        </Row>
        <Row>
        <br/><br/>
          <table id="table_id" className="display" >
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Logged Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </Row>
      </Grid>
    </div>
  )
}