import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { connect, useSelector, useDispatch } from 'react-redux';
import validateInfo from '../components/validation';

function ReservationsDetails(props) {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state
  });

  const initalState = {
    name: '',
    email: '',
    cell: '',
    address: '',
    zipcode: '',
    paymentMethod: '',

  };

  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [items, Setitems] = useState([]);
  const [successBox, SetsuccessBox] = useState(false);
  const [finaldata, Setfinaldata] = useState({});

  const handleChnage = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  useEffect(() => {
  }, [])

  return (
    <div>
      <ToastContainer />
      <div className='container clearfix'>
        <h3>Reservation Details</h3>
       
       
      </div>
    </div>
  );
}

export default ReservationsDetails;



