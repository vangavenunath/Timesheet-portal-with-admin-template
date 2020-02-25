import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { BASE_URL } from 'components/constants';
const $ = require('jquery');
$.DataTable = require('datatables.net');

export const DatatableLocal = (props) => {
    const [tableDataItems, setTableDataItems] = useState([{ Name: '',  Password:'', CreatedDate: '' }])
    const [toggle, setToggle] = useState(true)

    const columns = [
        {
            title: 'Name',
            width: 120,
            data: 'Name'
        },
        {
            title: 'Password',
            width: 180,
            data: 'Password'
        },
        {
            title: 'CreatedDate',
            width: 180,
            data: 'CreatedDate'
        },
    ];

    let table =  $("#main").DataTable({
        dom: '<"data-table-wrapper"t>',
        data: tableDataItems,
        columns,
        ordering: false
     })

    useEffect(() => {
        getUsers()

        //  return (() => {
        //      $('.data-table-wrapper')
        //  .find('table')
        //  .DataTable()
        //  .destroy(true)
    // })
        
    },[toggle])

    function reloadTableData(tableDataItems) {
        const table = $('.data-table-wrapper')
                      .find('table')
                      .DataTable();
        table.clear();
        table.rows.add(tableDataItems);
        table.draw();
    }

    const getUsers = async() => {

        axios({ method: 'GET',
          url: BASE_URL,
          data: {},
          headers: {'Content-Type': 'application/json'}
        })
          .then(result => {
            let arr = []
            for (var row in result.data) {
              arr.push({ Name: result.data[row][0], Password: result.data[row][1], CreatedDate: result.data[row][2] })
            
            }
            setTableDataItems(arr);
            reloadTableData(arr)
            })
        
      }

      

    return (
        <div>
            {console.log(tableDataItems)}
            <table id="main"  />
        </div>
    )

}