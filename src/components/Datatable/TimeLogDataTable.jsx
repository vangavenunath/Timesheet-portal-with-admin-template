import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'components/constants';
import Button from "components/CustomButton/CustomButton.jsx";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const TimeLogDataTableCDN = (props) => {
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        getLoginTimes()
      }, [props.username])

    
      const getLoginTimes = () => {
        let table = window.$x('#table_id').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf'
            ],
            destroy:true
        });
        const requestData = { username: [props.username] }
        console.log('=======requestData=========', requestData)
        axios({
          method: 'POST',
          url: BASE_URL + 'userlog',
          data: requestData,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
          .then(result => {
            console.log(result)
            const arr1 = eval(result.data)
            // console.log("Get process done",Array.from(result.data),typeof(Array.from(result.data)))
            let arr = []
            console.log("===================arr1=========", arr1, typeof (arr1))
            for (var row = 0; row < arr1.length; row++) {
              arr.push({
                create_date: arr1[row][1], start_time: arr1[row][2], end_time: arr1[row][3], comment: <CKEditor
                  editor={ClassicEditor}
                  config={{ toolbar: [] }} //{removePlugins: 'toolbar', allowedContent: 'p h1 h2 strong em; a[!href]; img[!src,width,height];'}
                  disabled={true}
                  data={arr1[row][4]} />
              }) //username: arr1[row][0],
            }
            // setTableDataItems(arr)
            console.log(arr)
            return arr
          })
          
        .then(arr => {
            table.clear()
            table.rows.add(arr).draw();
        })
      }     
      

    return (
        <div>
            <table id="table_id" className="display" >
                <thead>
                    <tr>
                        <th>Date Logged</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )

}