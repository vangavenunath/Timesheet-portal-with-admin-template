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
    axios({
      method: 'POST',
      url: BASE_URL,
      data: requestData,
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic ' + userpass
      }
    })
  }