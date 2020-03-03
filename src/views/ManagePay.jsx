import React, { useEffect } from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";

// import { Card } from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import axios from 'axios';
import { BASE_URL } from 'components/constants';
// import { PDFViewer } from '@react-pdf/renderer';
import { pdfDocGenerator } from 'components/Payslip/Payslip'
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
        <div className="content" style = {{"height":"100%"}}>
            <Grid fluid style = {{"height":"100%"}}>
            {/* <PDFViewer width="100%" height="100%"> */}
                        <pdfDocGenerator />
                    {/* </PDFViewer> */}
            </Grid>
        </div>
    );
}

