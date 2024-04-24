import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { connect, useSelector, useDispatch } from 'react-redux';
import validateInfo from '../components/validation';
import CustomDrop from '../components/CustomDrop';
import jsPDF from 'jspdf';

function ReservationsDetails(props) {

  let navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const dispatch = useDispatch();
  const getStates = useSelector((state) => {
    return state
  });

  const initalState = {
    seating: '',
    numberOfMembers: '',
    selectTime: '',
    occasion: '',
    reservedDate: '',
    name: '',
    email: '',
    cell: '',
    specialRequest: '',
  };

  const [values, setValues] = useState(initalState);
  const [errors, setErrors] = useState({});
  const [getResData, SetgetResData] = useState('');
  const [successBox, SetsuccessBox] = useState(false);
  const [finaldata, Setfinaldata] = useState({});
  const [formStep1, SetformStep1] = useState(true);
  const [formStep2, SetformStep2] = useState(false);

  const handleChnage = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const step1 = (e) => {
    setErrors(validateInfo({ values }));
    if (values.seating != '' &&
      values.numberOfMembers != '' &&
      values.selectTime != '' &&
      values.occasion != '' &&
      values.reservedDate != '') {
      if (values) {
        SetformStep1(false);
        SetformStep2(true);
      }
    }
  }

  const editRestaurant = () => {
    navigate('/Reservations');
  }

  const editInfo = () => {
    SetformStep1(true);
    SetformStep2(false);
  }

  const reservedFunc = () => {
    setErrors(validateInfo({ values }));
    if (values.name != '' &&
      values.email != '' &&
      values.cell != '' &&
      values.specialRequest != '') {
      if (values) {
        const getdata = {
          seating: values.seating,
          numberOfMembers: values.numberOfMembers,
          selectTime: values.selectTime,
          occasion: values.occasion,
          reservedDate: values.reservedDate,
          name: values.name,
          email: values.email,
          cell: values.cell,
          specialRequest: values.specialRequest,
        }
        Setfinaldata(getdata);
        setTimeout(() => {
          SetformStep1(false);
          SetformStep2(true);
          SetsuccessBox(true);
        }, 1000);
      }
    }
    else {
      return false
    }
  }

  const closeModal = () => {
    navigate('/Reservations');
  }

  const downloadPDF = () => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');
    //doc.addImage(require('../assets/img/logo.png'), 'PNG', 65, 20, 500, 400);
    // doc.addPage();
    doc.setFontSize(24);
    doc.text(50, 50, "Thanks!");
    doc.setFontSize(12);
    doc.text(50, 75, `Thank you for the Restaurant Reservation ${finaldata.name} we will meet in the restaurant with best services.`,);
    doc.line(50, 85, 560, 85);
    doc.setFontSize(16);
    doc.text(50, 125, "Restaurant Details");
    doc.addImage(getResData.picture, 'PNG', 50, 130, 50, 50);
    doc.setFontSize(12);
    doc.text(50, 200, getResData.name);
    doc.text(50, 230, getResData.branches);
    doc.text(50, 260, getResData.rating.toString());
    doc.line(200, 115, 200, 300);
    doc.setFontSize(16);
    doc.text(220, 125, "Booking Details");
    doc.setFontSize(12);
    doc.text(220, 160, values.seating);
    doc.text(220, 190, values.numberOfMembers);
    doc.text(220, 220, values.selectTime);
    doc.text(220, 250, values.occasion);
    doc.text(220, 280, values.reservedDate);
    doc.line(400, 115, 400, 300);
    doc.setFontSize(16);
    doc.text(420, 125, "Personal Details");
    doc.setFontSize(12);
    doc.text(420, 160, values.name);
    doc.text(420, 190, values.cell);
    doc.text(420, 220, values.email);
    var splitTitle = doc.splitTextToSize(values.specialRequest, 180);
    doc.text(420, 280, splitTitle);
    doc.save('receipt.pdf');
  }

  useEffect(() => {
    SetgetResData(data);
  }, [console.log('getResData', getResData)])

  return (
    <div>
      <div className='container clearfix'>
        <h3>Reservation Details</h3>
        {successBox &&
          <dd>
            <div className='overlay' onClick={() => SetsuccessBox(false)}></div>
            <div className='successBox'>
              <button className='close' onClick={() => closeModal(false)}>X</button>
              <p>
                <strong>Thanks!</strong>
                Thank you for the Restaurant Reservation '{values.name}' we will meet in the restaurant with best services.
              </p>
              <p><strong>Restaurant Details</strong></p>
              <ul>
                <li><img src={getResData.picture} alt="" /></li>
                <li><span>{getResData.name}</span></li>
                <li><span>{getResData.branches}</span></li>
                <li><span>{getResData.rating}</span></li>
              </ul>
              <p><strong>Booking Details</strong></p>
              <ul>
                <li><span>{values.seating}</span></li>
                <li><span>{values.numberOfMembers}</span></li>
                <li><span>{values.selectTime}</span></li>
                <li><span>{values.occasion}</span></li>
                <li><span>{values.reservedDate}</span></li>
              </ul>
              <p><strong>Personal Details</strong></p>
              <ul>
                <li><span>{values.name}</span></li>
                <li><span>{values.email}</span></li>
                <li><span>{values.cell}</span></li>
                <li><span>{values.specialRequest}</span></li>
              </ul>
              <div className='clearfix'>
                <button className='successBoxBtn' onClick={() => closeModal(false)}>Done</button>
                <button className="successBoxBtn" onClick={() => downloadPDF()}>Download Receipt</button>
              </div>
            </div>
          </dd>}
        <Row>
          <Col md={8}>
            <div className='resFormLeft'>
              {formStep1 &&
                <div>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <br />
                        <Form.Check
                          inline
                          type='radio'
                          label='Indoorseating'
                          checked={values.seating === 'Indoorseating'}
                          name='seating'
                          value="Indoorseating"
                          onChange={handleChnage}
                        />
                        <Form.Check
                          inline
                          type='radio'
                          label='Outdoorseating'
                          checked={values.seating === 'Outdoorseating'}
                          name='seating'
                          value="Outdoorseating"
                          onChange={handleChnage}
                        />
                        {errors.seating && <p className='error'>{errors.seating}</p>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Number Of Diners</Form.Label>
                        <Form.Select name="numberOfMembers" value={values.numberOfMembers} onChange={handleChnage}>
                          <option hidden selected>Select</option>
                          <option value="1 Diner">1 Diner</option>
                          <option value="2 Diners">2 Diners</option>
                          <option value="3 Diners">3 Diners</option>
                          <option value="4 Diners">4 Diners</option>
                          <option value="5 Diners">5 Diners</option>
                          <option value="6 Diners">6 Diners</option>
                          <option value="7 Diners">7 Diners</option>
                          <option value="8 Diners">8 Diners</option>
                          <option value="9 Diners">9 Diners</option>
                          <option value="10 Diners">10 Diners</option>
                        </Form.Select>
                        {errors.numberOfMembers && <p className='error'>{errors.numberOfMembers}</p>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Time</Form.Label>
                        <Form.Select name="selectTime" value={values.selectTime} onChange={handleChnage}>
                          <option hidden selected>Select</option>
                          <option value="5:00 pm">5:00 pm</option>
                          <option value="6:00 pm">6:00 pm</option>
                          <option value="7:00 pm">7:00 pm</option>
                          <option value="8:00 pm">8:00 pm</option>
                          <option value="9:00 pm">9:00 pm</option>
                          <option value="10:00 pm">10:00 pm</option>
                          <option value="11:00 pm">11:00 pm</option>
                          <option value="12:00 pm">12:00 pm</option>
                        </Form.Select>
                        {errors.selectTime && <p className='error'>{errors.selectTime}</p>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Occasion</Form.Label>
                        <Form.Select name="occasion" value={values.occasion} onChange={handleChnage}>
                          <option hidden selected>Select</option>
                          <option value="Birthday">Birthday</option>
                          <option value="Engagement">Engagement</option>
                          <option value="Anniversary">Anniversary</option>
                        </Form.Select>
                        {errors.occasion && <p className='error'>{errors.occasion}</p>}
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control name='reservedDate' type="date" value={values.reservedDate} onChange={handleChnage} />
                        {errors.reservedDate && <p className='error'>{errors.reservedDate}</p>}
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex flex-row-reverse">
                    <Button variant="dark" onClick={() => step1()}>Next</Button>
                  </div>
                </div>}
              {formStep2 &&
                <div>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' value={values.name} onChange={handleChnage} />
                        {errors.name && <p className='error'>{errors.name}</p>}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" value={values.email} onChange={handleChnage} />
                        {errors.email && <p className='error'>{errors.email}</p>}
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Cell</Form.Label>
                        <Form.Control name="cell" value={values.cell} onChange={handleChnage} />
                        {errors.cell && <p className='error'>{errors.cell}</p>}
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Special Request</Form.Label>
                        <Form.Control as="textarea" cols={30} rows={5} name="specialRequest" value={values.specialRequest} onChange={handleChnage} />
                        {errors.specialRequest && <p className='error'>{errors.specialRequest}</p>}
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex flex-row-reverse">
                    <Button variant="dark" onClick={() => reservedFunc()}>Reserved</Button>
                  </div>
                </div>
              }
            </div>
          </Col>
          <Col md={4}>
            <div className='resFormRight'>
              <h3>Restaurant & Booking Details</h3>
              <ul>
                <li><img src={getResData.picture} alt="" /></li>
                <li>Name: <span>{getResData.name}</span></li>
                <li>Branch: <span>{getResData.branches}</span></li>
                <li>Rating: <span>{getResData.rating}</span></li>
                <button onClick={() => editRestaurant()}><BiPencil color='#000' size={24} /></button>
              </ul>
              {formStep2 &&
                <ul>
                  <li>Seating: <span>{values.seating}</span></li>
                  <li>Members: <span> {values.numberOfMembers}</span></li>
                  <li>Time: <span> {values.selectTime}</span></li>
                  <li>Occasion: <span> {values.occasion}</span></li>
                  <li>Date: <span> {values.reservedDate}</span></li>
                  <button onClick={() => editInfo()}><BiPencil color='#000' size={24} /></button>
                </ul>
              }
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ReservationsDetails;



