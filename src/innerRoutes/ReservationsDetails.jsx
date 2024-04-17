import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { connect, useSelector, useDispatch } from 'react-redux';
import validateInfo from '../components/validation';
import CustomDrop from '../components/CustomDrop';
import jsPDF from 'jspdf';

function ReservationsDetails(props) {

  // let navigate = useNavigate();

  const dispatch = useDispatch();
  // const data = useSelector((state) => {
  //   return state
  // });

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
  // const [successBox, SetsuccessBox] = useState(false);
  // const [finaldata, Setfinaldata] = useState({});

  const handleChnage = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  useEffect(() => {
  }, [])











  let navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [seating, Setseating] = useState('');
  const [reservedDate, SetreservedDate] = useState('');
  const [getResData, SetgetResData] = useState('');

  const numberOfMembers = [
    {
      id: 0,
      mNum: '1 Diner',
    },
    {
      id: 1,
      mNum: '2 Diners',
    },
    {
      id: 2,
      mNum: '3 Diners',
    },
    {
      id: 3,
      mNum: '4 Diners',
    },
    {
      id: 4,
      mNum: '5 Diners',
    },
    {
      id: 5,
      mNum: '6 Diners',
    },
    {
      id: 6,
      mNum: '7 Diners',
    },
    {
      id: 7,
      mNum: '8 Diners',
    },
    {
      id: 8,
      mNum: '9 Diners',
    },
    {
      id: 9,
      mNum: '10 Diners',
    }
  ];

  const selectTime = [
    {
      id: 0,
      bTime: '5:00 pm',
    },
    {
      id: 1,
      bTime: '6:00 pm',
    },
    {
      id: 2,
      bTime: '7:00 pm',
    },
    {
      id: 3,
      bTime: '8:00 pm',
    },
    {
      id: 4,
      bTime: '9:00 pm',
    },
    {
      id: 5,
      bTime: '10:00 pm',
    }
  ];

  const occasion = [
    {
      id: 0,
      sOccasion: 'Birthday',
    },
    {
      id: 1,
      sOccasion: 'Engagement',
    },
    {
      id: 2,
      sOccasion: 'Anniversary',
    }
  ];

  const [chooseMember, SetchooseMember] = useState('');
  const selectMember = (item) => {
    SetchooseMember(item.mNum);
  }

  const [chooseTime, SetchooseTime] = useState('');
  const seletcTime = (item) => {
    SetchooseTime(item.bTime);
  }

  const [chooseOccasion, SetchooseOccasion] = useState('');
  const selectOccasion = (item) => {
    SetchooseOccasion(item.sOccasion);
  }

  const [firstName, SetfirstName] = useState('');
  const [lastName, SetlastName] = useState('');
  const [email, Setemail] = useState('');
  const [cell, Setcell] = useState('');
  const [specialRequest, SetspecialRequest] = useState('');

  const [seatingErr, SetseatingErr] = useState("");
  const [reservedDateErr, SetreservedDateErr] = useState("");
  const [chooseMemberErr, SetchooseMemberErr] = useState("");
  const [chooseTimeErr, SetchooseTimeErr] = useState("");
  const [chooseOccasionErr, SetchooseOccasionErr] = useState("");

  const [firstNameErr, SetfirstNameErr] = useState("");
  const [lastNameErr, SetlastNameErr] = useState("");
  const [emailErr, SetemailErr] = useState("");
  const [cellErr, SetcellErr] = useState("");
  const [specialRequestErr, SetspecialRequestErr] = useState("");

  const [successBox, SetsuccessBox] = useState(false);
  const [finaldata, Setfinaldata] = useState({});


  function clearSubmission() {
    SetseatingErr("");
    SetreservedDateErr("");
    SetchooseMemberErr("");
    SetchooseTimeErr("");
    SetchooseOccasionErr("");
    SetfirstNameErr("");
    SetlastNameErr("");
    SetemailErr("");
    SetcellErr("");
    SetspecialRequestErr("");
  }

  const [formStep1, SetformStep1] = useState(true);
  const [formStep2, SetformStep2] = useState(false);

  const step1 = () => {
    clearSubmission();
    if (seating == undefined || seating == "") {
      SetseatingErr("Select Seating");
    }
    if (reservedDate == undefined || reservedDate == "") {
      SetreservedDateErr("Select Data");
    }
    if (chooseMember == undefined || chooseMember == "") {
      SetchooseMemberErr("Select No Of Member");
    }
    if (chooseTime == undefined || chooseTime == "") {
      SetchooseTimeErr("Select Time");
    }
    if (chooseOccasion == undefined || chooseOccasion == "") {
      SetchooseOccasionErr("Select Occasion");
    }
    if (seating != '' &&
      reservedDate != '' &&
      chooseMember != '' &&
      chooseTime != '' &&
      chooseOccasion != '') {
      SetformStep1(false);
      SetformStep2(true);
    }
    else {
      return false
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
    clearSubmission();
    if (firstName == undefined || firstName == "" || firstName.length <= 5) {
      SetfirstNameErr("enter first name above 5 character");
    }
    if (lastName == undefined || lastName == "" || lastName.length <= 5) {
      SetlastNameErr("enter last name above 5 character");
    }
    var emailRgx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email == undefined || email == "" || !emailRgx.test(email)) {
      SetemailErr("enter your valid email address");
    }
    var cellRgx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (cell == undefined || cell == "" || (cellRgx.test(cell) == false)) {
      SetcellErr("enter your valid cell number");
    }
    if (specialRequest == undefined || specialRequest == "") {
      SetspecialRequestErr("you can write here special request");
    }
    if (firstName != '' &&
      lastName != '' &&
      email != '' &&
      cell != '' &&
      specialRequest != '') {
      const getdata = {
        seating,
        reservedDate,
        chooseMember,
        chooseTime,
        chooseOccasion,
        firstName,
        lastName,
        email,
        cell,
        specialRequest,
      }
      Setfinaldata(getdata);
      setTimeout(() => {
        // Setseating('');
        // SetreservedDate('');
        // SetchooseMember('');
        // SetchooseTime('');
        // SetchooseOccasion('');
        // SetfirstName('');
        // SetlastName('');
        // Setemail('');
        // Setcell('');
        // SetspecialRequest('');
        SetformStep1(false);
        SetformStep2(true);
        SetsuccessBox(true);
      }, 1000);
      console.log(getdata);
    }
    else {
      return false
    }
  }

  const closeModal = () => {
    Setseating('');
    SetreservedDate('');
    SetchooseMember('');
    SetchooseTime('');
    SetchooseOccasion('');
    SetfirstName('');
    SetlastName('');
    Setemail('');
    Setcell('');
    SetspecialRequest('');
    SetgetResData('');
    navigate('/Reservations');
  }

  const downloadPDF = () => {
    var doc = new jsPDF('landscape', 'px', 'a4', 'false');
    //doc.addImage(require('../assets/img/logo.png'), 'PNG', 65, 20, 500, 400);
    // doc.addPage();
    doc.setFontSize(24);
    doc.text(50, 50, "Thanks!");
    doc.setFontSize(12);
    doc.text(50, 75, `Thank you for the Restaurant Reservation ${finaldata.firstName} we will meet in the restaurant with best services.`,);
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
    doc.text(220, 160, seating);
    doc.text(220, 190, chooseMember);
    doc.text(220, 220, chooseTime);
    doc.text(220, 250, chooseOccasion);
    doc.text(220, 280, reservedDate);
    doc.line(400, 115, 400, 300);
    doc.setFontSize(16);
    doc.text(420, 125, "Personal Details");
    doc.setFontSize(12);
    doc.text(420, 160, firstName);
    doc.text(420, 190, lastName);
    doc.text(420, 220, email);
    doc.text(420, 250, cell);
    var splitTitle = doc.splitTextToSize(specialRequest, 180);
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
              Thank you for the Restaurant Reservation '{finaldata.firstName}' we will meet in the restaurant with best services.
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
              <li><span>{seating}</span></li>
              <li><img className='successBoxImg' src={require('../assets/images/peopleIcon.png')} /><span>{chooseMember}</span></li>
              <li><img className='successBoxImg' src={require('../assets/images/timeIcon.png')} /><span>{chooseTime}</span></li>
              <li><img className='successBoxImg' src={require('../assets/images/occasionIcon.png')} /><span>{chooseOccasion}</span></li>
              <li><img className='successBoxImg' src={require('../assets/images/dateIcon.png')} /><span>{reservedDate}</span></li>
            </ul>
            <p><strong>Personal Details</strong></p>
            <ul>
              <li><span>{firstName}</span></li>
              <li><span>{lastName}</span></li>
              <li><span>{email}</span></li>
              <li><span>{cell}</span></li>
              <li><span>{specialRequest}</span></li>
            </ul>
            <div className='clearfix'>
              <button className='successBoxBtn' onClick={() => closeModal(false)}>Done</button>
              <button className="successBoxBtn" onClick={() => downloadPDF()}>Downloa Receipt</button>
            </div>
          </div>
        </dd>}
      <div className='container clearfix'>
        <div className='checkoutleftblock'>
          <h2>Reservation Details</h2>
          {formStep1 &&
            <div>
              <div className='radiolist'>
                <label>
                  <input type="radio" checked={seating === 'Indoorseating'} value="Indoorseating" onChange={() => Setseating('Indoorseating')} />
                  Indoor Seating</label>
                <label>
                  <input type="radio" checked={seating === 'Outdoorseating'} value="Outdoorseating" onChange={() => Setseating('Outdoorseating')} />
                  Outdoor Seating </label>
              </div>
              <div className='divstyle'><p className='error'>{seatingErr}</p></div>
            <div className='gridContainer1'>
              <div>
                <label className='venueSelect'>Number Of Diners</label>
                <CustomDrop
                  categoryIcon={require('../assets/images/peopleIcon.png')}
                  widthSet={{ width: "50%", float: 'left' }}
                  data={numberOfMembers}
                  selectFinalValue={chooseMember || 'Select No Of Diners'}
                  selectRandomValue={(item) => selectMember(item)}
                />
                <p className='error'>{chooseMemberErr}</p>
              </div>
              <div>
                <label className='venueSelect'>Time</label>
                <CustomDrop
                  categoryIcon={require('../assets/images/timeIcon.png')}
                  widthSet={{ width: "50%", float: 'left' }}
                  data={selectTime}
                  selectFinalValue={chooseTime || 'Select Time'}
                  selectRandomValue={(item) => seletcTime(item)}
                />
                <p className='error'>{chooseTimeErr}</p>
              </div>
              <div>
                <label className='venueSelect'>Occasion</label>
                <CustomDrop
                  categoryIcon={require('../assets/images/occasionIcon.png')}
                  data={occasion}
                  selectFinalValue={chooseOccasion || 'Occasion'}
                  selectRandomValue={(item) => selectOccasion(item)}
                />
                <p className='error'>{chooseOccasionErr}</p>
              </div>
              <div>
                <label className='venueSelect'>Date</label>
                <input type="date" step="2" className='customDataStyle' value={reservedDate} onChange={(e) => SetreservedDate(e.target.value)} />
                <p className='error'>{reservedDateErr}</p>
              </div>
              </div>
              <div>
                <button className='reserveBtn' onClick={() => step1()}>Next</button>
              </div>
            </div>}
          {formStep2 &&
            <div>
              <div className='gridContainer1'>
              <div className='fieldBox'>
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => SetfirstName(e.target.value)} />
                <p className='error'>{firstNameErr}</p>
              </div>
              <div className='fieldBox'>
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => SetlastName(e.target.value)} />
                <p className='error'>{lastNameErr}</p>
              </div>
              <div className='fieldBox'>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => Setemail(e.target.value)} />
                <p className='error'>{emailErr}</p>
              </div>
              <div className='fieldBox'>
                <label>Cell</label>
                <input type="text" value={cell} onChange={(e) => Setcell(e.target.value)} />
                <p className='error'>{cellErr}</p>
              </div>
              <div className='textareaBox'>
                <label>Special Request</label>
                <textarea cols={30} rows={5} value={specialRequest} onChange={(e) => SetspecialRequest(e.target.value)}></textarea>
                <p className='error'>{specialRequestErr}</p>
              </div>
              </div>
              <div>
                <button className='reserveBtn' onClick={() => reservedFunc()}>Reserved</button>
              </div>
            </div>
          }
        </div>
        <div className='checkoutrightblock'>
          <h3>Restaurant & Booking Details</h3>
          <div className='fetchInfo1'>
            <img src={getResData.picture} alt="" />
            <p>Name: <span>{getResData.name}</span></p>
            <p>Branch: <span>{getResData.branches}</span></p>
            <p>Rating: <span>{getResData.rating}</span></p>
            <button onClick={() => editRestaurant()}>
              <img src={require('../assets/images/edit.png')} /></button>
          </div>
          {formStep2 &&
              <div className='fetchInfo1'>
                <p>&nbsp;</p>
                <p>Seating: <span>{seating}</span></p>
                <p>Members: <span><img src={require('../assets/images/peopleIcon.png')} /> {chooseMember}</span></p>
                <p>Time: <span><img src={require('../assets/images/timeIcon.png')} /> {chooseTime}</span></p>
                <p>Occasion: <span><img src={require('../assets/images/occasionIcon.png')} /> {chooseOccasion}</span></p>
                <p>Date: <span><img src={require('../assets/images/dateIcon.png')} /> {reservedDate}</span></p>
                <button onClick={() => editInfo()}><img src={require('../assets/images/edit.png')} /></button>
              </div>
          }
        </div>
      </div>

      </div>
    </div>
  );
}

export default ReservationsDetails;



