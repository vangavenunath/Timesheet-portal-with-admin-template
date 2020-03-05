import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'components/constants';
import Button from "components/CustomButton/CustomButton.jsx";
import {deleteSelectedUsers, getAllUserDetails} from 'actions/API'

export const DatatableCDN = (props) => {
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        getUsers()
    },[toggle, props.reloadData])

    
    const getUsers = () => {
        
        let table = window.$x('#table_id').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf'
            ],
            destroy:true
        });
        window.$x('#table_id tbody').on( 'click', 'tr', function () {
            console.log("Toggle Functionality enabled"+this.toString())
            window.$x(this).toggleClass('selected');
        } );
        window.$x('#button').click( function () {
            deleteAll(Array.from(window.$x('#table_id').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf'
                ],
                destroy:true
            }).rows('.selected').data().map(r => r[0])))
        })

        getAllUserDetails().then(result => {
            table.clear()
            table.rows.add(result).draw();
        })
        return table;
        
      }
      
      const deleteAll = (rows) => {
    
        if (window.confirm(`Are you sure you want to delete:\r ${rows}?`)) {
          // this.setState(state => ({ toggleCleared: !state.toggleCleared, data: differenceBy(state.data, state.selectedRows, 'name') }));
          deleteSelectedUsers(rows)
            .then(result => {console.log("Delete process done", result)
            setToggle(!toggle)
        }
            )
          console.log('clicked', rows);
        }
      }

    return (
        <div>
            <Button id="button" bsStyle="info" pullRight fill type="submit">Delete User(s)</Button>
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