import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'components/constants';

export const DatatableCDN = (props) => {
    const [tableDataItems, setTableDataItems] = useState([{ Name: '',  Password:'', CreatedDate: '' }])
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        let table = getUsers()
       

    },[toggle])

    
    const getUsers = async() => {
        
        let table = window.$('#table_id').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf'
            ],
            destroy: true
        });

        axios({ method: 'GET',
          url: BASE_URL,
          data: {},
          headers: {'Content-Type': 'application/json'}
        })
        .then(result => table.rows.add(result.data).draw())
        .then(()=>{
            // table.draw();
            console.log(table.data)
            window.$('#table_id tbody').on( 'click', 'tr', function () {
                window.$(this).toggleClass('selected');
            } );
         
            window.$('#button').click( function () {
                console.log(table.rows('.selected').data())
                alert( table.rows('.selected').data().length +' row(s) selected' );
            } );
        })
        return table;
        
      }

    return (
        <div>
            <button id="button">RowCount</button>
            <table id="table_id" className="display" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Password</th>
                        <th>CreatedDate</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    )

}