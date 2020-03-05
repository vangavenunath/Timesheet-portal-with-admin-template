import axios from 'axios';
import { BASE_URL } from 'components/constants';

export const getNotifications = async() => {
    let arr1 = []
    const result = await axios({
      method: 'POST',
      url: BASE_URL + 'leaves',
      data: {},
      headers: { 'Content-Type': 'application/json' }
    })
    arr1 = eval(result.data)
    return arr1
  }

  export const checkUser = async(requestData) => {
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:80/api/'+'checkUser.php',
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic ' + userpass
      }
    })
    return result.data
  }

  export const getUsers = async() => {
    const result = await axios({
        method: 'GET',
        url: BASE_URL+'users',
        headers: {'Content-Type': 'application/json'}
      })
    console.log(result)
    const arr1 = eval(result.data)
    let arr = []
    for (var row = 0; row < arr1.length; row++) {
      arr.push({ key: arr1[row][0], text: arr1[row][0], value: arr1[row][0] })
    }
    return arr;
  }

  export const getAvailablePayslips = async(username) => {
    // const result = await axios({
    //   method: 'GET',
    //   url: BASE_URL+'Payslips/list_of_payslips_by_user.php?username='+username,
    //   headers: {'Content-Type': 'application/json'}
    // })
    // console.log(result)
    // const arr1 = eval(result.data)
    // let arr = []
    // for (var row = 0; row < arr1.length; row++) {
    //   arr.push({ key: arr1[row][0], text: arr1[row][0], value: arr1[row][0] })
    // }
    return [{ key: 1, text: 'Jan 2020', value: 'Jan 2020'},{ key: 1, text: 'Feb 2020', value: 'Feb 2020'}];
  }

  export const getAllUserDetails = async() => {
    const result = await axios({ method: 'GET',
          url: BASE_URL,
          data: {},
          headers: {'Content-Type': 'application/json'}
        })
    return result
  }

  export const deleteSelectedUsers = async(rows) => {
    const result = await axios({
      method: 'DELETE',
      url: BASE_URL,
      data: rows,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return result;
  }

  export const getLoginTimesByUser = async(requestData) => {
    const result = await axios({
      method: 'POST',
      url: BASE_URL + 'userlog',
      data: requestData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return result;

  }