import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import { BASE_URL } from '../constants';
import 'semantic-ui-css/semantic.min.css';
import {getUsers} from 'actions/API'

export const DropdownMultipleSelection = (props) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        getUsers().then(arr => setOptions(arr))
        console.log('==========options=============',options)
    },[])
    
    
    const handleDropdownChange = (event, data) => {
        console.log(data.value)
        props.setUsers(data.value)
    }
    
    return(
        <div>
        <Dropdown placeholder='Select user(s)' fluid multiple selection options={options} onChange={(event, data) => handleDropdownChange(event, data)} />
        </div>
    )
    // style={{width:"20%"}}
            
    
}
  

