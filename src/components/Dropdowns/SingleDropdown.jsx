import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { BASE_URL } from '../constants';
import 'semantic-ui-css/semantic.min.css'
import {getAvailablePayslips} from 'actions/API'

export const DropdownSingleSelection = (props) => {
    const [options, setOptions] = useState([])
    useEffect(() => {
        getAvailablePayslips('test').then(arr => setOptions(arr))
        console.log('==========options=============',options)
    },[])

    const handleDropdownChange = (event, data) => {
        console.log(data.value)
        // props.setUsers(data.value)
    }
    
    return(
        <div>
        <Dropdown placeholder='Select Pay Month' fluid options={options} onChange={(event, data) => handleDropdownChange(event, data)} />
        </div>
    )
    // style={{width:"20%"}}
            
    
}
  

