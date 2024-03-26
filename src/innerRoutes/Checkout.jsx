import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addToCart, incrementItem, decrementItem, removeToCart, ordersuccess } from '../redux/slices/menuSlice';
import { clearRestaurant } from '../redux/slices/restaurantSlice';

function Checkout(props) {

  const [items, Setitems] = useState([]);

  const [name, Setname] = useState('');
  const [email, Setemail] = useState('');
  const [cell, Setcell] = useState('');
  const [address, Setaddress] = useState('');
  const [zipcode, Setzipcode] = useState('');
  const [paymentMethod, SetpaymentMethod] = useState('');

  const [nameErr, SetnameErr] = useState("");
  const [emailErr, SetemailErr] = useState("");
  const [cellErr, SetcellErr] = useState("");
  const [addressErr, SetaddressErr] = useState("");
  const [zipcodeErr, SetzipcodeErr] = useState("");
  const [paymentMethodErr, SetpaymentMethodErr] = useState("");

  const [successBox, SetsuccessBox] = useState(false);
  const [finaldata, Setfinaldata] = useState({});

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state
  });

  const removeItem = (id) => {
    const newList = data.menuSlice.menuList.filter((item) => item.id !== id);
    Setitems(newList);
    dispatch(removeToCart(
      id
    ))
  }

  const addExistingItem = (pItem) => {
    console.log('call addExistingItem', pItem);
    dispatch(incrementItem(
      pItem
    ))
  }

  const removeExistingItem = (pItem) => {
    console.log('call removeExistingItem', pItem);
    dispatch(decrementItem(
      pItem
    ))
  }

  function clearSubmission() {
    SetnameErr("");
    SetemailErr("");
    SetcellErr("");
    SetaddressErr("");
    SetzipcodeErr("");
    SetpaymentMethodErr("");
  }

  const orderPlaced = () => {
    clearSubmission();
    if (name == undefined || name == "" || name.length <= 5) {
      SetnameErr("enter name above 5 character");
    }
    var emailRgx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (email == undefined || email == "" || !emailRgx.test(email)) {
      SetemailErr("enter your valid email address");
    }
    var cellRgx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (cell == undefined || cell == "" || (cellRgx.test(cell) == false)) {
      SetcellErr("enter your valid cell number");
    }
    if (zipcode == undefined || zipcode == "" || zipcode.length < 5) {
      SetzipcodeErr("enter your zipcode");
    }
    if (address == undefined || address == "" || address.length <= 15) {
      SetaddressErr("enter your correct address");
    }
    if (paymentMethod == undefined || paymentMethod == "") {
      SetpaymentMethodErr("Select payment method");
    }
    if (name != '' &&
      email != '' &&
      cell != '' &&
      zipcode != '' &&
      address != '' &&
      paymentMethod != '') {
      const getdata = {
        name,
        email,
        cell,
        zipcode,
        address,
        paymentMethod
      }
      Setfinaldata(getdata);
      setTimeout(() => {
        Setname('');
        Setemail('');
        Setcell('');
        Setzipcode('');
        Setaddress('');
        SetpaymentMethod('');
        dispatch(ordersuccess());
        dispatch(clearRestaurant());
        SetsuccessBox(true);
      }, 1000);
    }
    else {
      return false
    }
  }

  const getTotal = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal = subtotal + (item.itemPrice * item.quantity)
    })
    return subtotal;
  }

  const tax = 3;
  const discount = 5;
  const getSubTotal = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal = subtotal + (item.itemPrice * item.quantity)
    })
    return subtotal + tax - discount;
  }

  const goToHome = () => {
    navigate('/');
    SetsuccessBox(false);
  }

  const [cardNumber, SetCardNumber] = useState('');
  const [expiryDate, SetexpiryDate] = useState('');
  const [cvc, Setcvc] = useState('');
  const [cardHolderName, SetcardHolderName] = useState('');
  const [getcard, Setgetcard] = useState([]);

  const [cardNumberErr, SetcardNumberErr] = useState('');
  const [expiryDateErr, SetexpiryDateErr] = useState('');
  const [cvcErr, SetcvcErr] = useState('');
  const [cardHolderNameErr, SetcardHolderNameErr] = useState('');


  // var number = 50000
  // var percent = 5
  // var result = 0
  // for (var index = 0; index < number; index++) {
  //   const calculate = index / number * 100
  //   if (calculate == percent) result += index
  // }
  // console.log(result);

  function clearSubmission2() {
    SetcardNumberErr("");
    SetexpiryDateErr("");
    SetcvcErr("");
    SetcardHolderNameErr("");
  }

  var replacedcardNumber = null;

  const addCard = () => {
    clearSubmission2();
    if (cardNumber == undefined || cardNumber == "" || cardNumber.length <= 18) {
      SetcardNumberErr("enter valid card number");
    }
    if (expiryDate == undefined || expiryDate == "") {
      SetexpiryDateErr("enter expiry date");
    }
    if (cvc == undefined || cvc == "" || cvc.length <= 2) {
      SetcvcErr("enter your cvc");
    }
    if (cardHolderName == undefined || cardHolderName == "") {
      SetcardHolderNameErr("enter your card name");
    }
    if (cardNumber != '' &&
      expiryDate != '' &&
      cvc != '' &&
      cardHolderName != '') {
      const getcardinfo = {
        replacedcardNumber: cardNumber.replace(/.(?=.{4,}$)/g, '*'),
        expiryDate,
        cvc,
        cardHolderName
      }
      Setgetcard(getcardinfo);
      setTimeout(() => {
        SetCardNumber('');
        SetexpiryDate('');
        Setcvc('');
        SetcardHolderName('');
      }, 1000);
    }
    else {
      return false
    }
  }

  useEffect(() => {
    if (cardNumber.length === 4)
      SetCardNumber(cardNumber + " ")
    else if (cardNumber.length === 9) {
      SetCardNumber(cardNumber + " ")
    } else if (cardNumber.length === 14) {
      SetCardNumber(cardNumber + " ")
    }
  }, [cardNumber]);

  useEffect(() => {
  }, [])

  return (
    <div>
      {successBox &&
        <dd>
          <div className='overlay' onClick={() => goToHome()}></div>
          <div className='successBox'>
            <button className='close' onClick={() => goToHome()}>X</button>
            <p>
              <strong>All good!</strong>
              Thanks for your order placing '{finaldata.name}' We will meet to your home shortly with your favorite food!
            </p>
          </div>
        </dd>}
      <div className='container'>
        <h3>Checkout</h3>
      </div>
      <div className='container clearfix'>
        <div className='checkoutleftblock'>
          <h2>Devilery information</h2>
          {data.menuSlice.menuList.length == 0 ? null :
            <div>
              <h2>before order placing fill required field otherwise order does not place!</h2>
              <div className='gridContainer1'>
                <div className='fieldBox'>
                  <label>Name</label>
                  <input type='text' value={name} onChange={(e) => Setname(e.target.value)} />
                  <p className='error'>{nameErr}</p>
                </div>
                <div className='fieldBox'>
                  <label>Email</label>
                  <input type='email' value={email} onChange={(e) => Setemail(e.target.value)} />
                  <p className='error'>{emailErr}</p>
                </div>
                <div className='fieldBox'>
                  <label>Cell</label>
                  <input type='text' value={cell} onChange={(e) => Setcell(e.target.value)} />
                  <p className='error'>{cellErr}</p>
                </div>
                <div className='fieldBox'>
                  <label>Zip code</label>
                  <input type='text' value={zipcode} onChange={(e) => Setzipcode(e.target.value)} />
                  <p className='error'>{zipcodeErr}</p>
                </div>
                <div className='textareaBox'>
                  <label>Devilery Address</label>
                  <textarea rows="4" value={address} onChange={(e) => Setaddress(e.target.value)}></textarea>
                  <p className='error'>{addressErr}</p>
                </div>
                <div className='radiolist'>
                  <label>Select Payment Method</label>
                  <div className='radiolist'>
                    <label className=''>
                      <input type="radio" checked={paymentMethod === 'cashOnDevilery'} value="cashOnDevilery" onChange={() => SetpaymentMethod('cashOnDevilery')} />
                      Cash On Devilery</label>
                    <label className=''>
                      <input type="radio" checked={paymentMethod === 'onlinePayment'} value="onlinePayment" onChange={() => SetpaymentMethod('onlinePayment')} />
                      Online Payment </label>
                  </div>
                </div>
              </div>

              {getcard.length == 0 ? null
                :
                <div className='radiolist'>
                  <label><input type='radio' checked={paymentMethod === 'selectOnlinePayment'} onChange={() => SetpaymentMethod('selectOnlinePayment')} /> </label>
                  <label>{getcard.replacedcardNumber}</label>
                  <label>{getcard.expiryDate}</label>
                  <label>{getcard.cvc}</label>
                  <label>{getcard.cardHolderName}</label>
                </div>}
              <p className='error'>{paymentMethodErr}</p>
              {paymentMethod == 'onlinePayment' ?
                <div>
                  <div className='paymentform'>
                    <div className='paymentfield1'>
                      <label>Card Number</label>
                      <input maxLength={19} className='paymentinput1' value={cardNumber} onChange={(e) => SetCardNumber(e.target.value)} type='text' placeholder='0000 0000 0000 0000' />
                      <p className='error'>{cardNumberErr}</p>
                    </div>
                    <div className='paymentfield2'>
                      <label>Expiry Date</label>
                      <input className='paymentinput2' value={expiryDate} onChange={(e) => SetexpiryDate(e.target.value)} type='date' placeholder='MM/YY' />
                      <p className='error'>{expiryDateErr}</p>
                    </div>
                    <div className='paymentfield2'>
                      <label>CVC/CVV</label>
                      <input maxLength={3} className='paymentinput2' value={cvc} onChange={(e) => Setcvc(e.target.value)} type='text' placeholder='***' />
                      <p className='error'>{cvcErr}</p>
                    </div>
                    <div className='paymentfield1'>
                      <label>Card Holder Name</label>
                      <input className='paymentinput1' value={cardHolderName} onChange={(e) => SetcardHolderName(e.target.value)} type='text' placeholder='Card Holder Fullname' />
                      <p className='error'>{cardHolderNameErr}</p>
                    </div>
                    <button onClick={addCard}>Add Card</button>
                  </div>
                </div>
                : null}
            </div>}
        </div>
        <div className='checkoutrightblock'>
          <h3>Order Summary</h3>
          <Scrollbars style={{ height: 400 }}>
            {data.menuSlice.menuList.length == 0 ? <h3>Cart Is Empty...</h3>
              :
              <ul>
                {data.menuSlice.menuList.length >= 0 ?
                  data.menuSlice.menuList?.map((pItem, index) => (
                    <li key={index.toString()}>
                      <img src={pItem.itemImg} alt="" />
                      <p>{pItem.itemName}</p>
                      <p>Price ${pItem.itemPrice}</p>
                      <p className='paralimit'>{pItem.itemDescription}</p>
                      <p>{pItem.itemType}</p>
                      <dd className='qtyCtrl2'>
                        <button onClick={() => removeExistingItem(pItem)}>-</button>
                        <span>{pItem.quantity}</span>
                        <button onClick={() => addExistingItem(pItem)}>+</button>
                      </dd>
                      <button className='checkclosebtn' onClick={() => removeItem(pItem.id)}>X</button>
                    </li>
                  ))
                  : <p>Card is Empty</p>
                }
              </ul>
            }
          </Scrollbars>
          <div className='billBox'>
            <p>Items Quantity <span>{data.menuSlice.menuList.length}</span></p>
            <p>Sub Total <span>${getTotal(data.menuSlice.menuList)}</span></p>
            <p>Tax (3%) <span>${tax}</span></p>
            <p>Discount (-5%) <span style={{ color: '#51ca51' }}>$-{discount}</span></p>
            <p>Total <span style={{ color: '#51ca51' }}>${getSubTotal(data.menuSlice.menuList)}</span></p>
            <button
              disabled={paymentMethod == 'onlinePayment' ? true :
                paymentMethod == 'selectOnlinePayment' ? false : null}
              onClick={() => orderPlaced()}>Confirm Order</button>
          </div>
        </div>









        {/* <div className="main-wrapper">
          <div className="responsive-table">
            <table className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Img</th>
                  <th>ProductTitle</th>
                  <th>ProductPrice</th>
                  <th>ProductDescription</th>
                  <th>ProductType</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              {data.menuSlice.menuList.length == 0 ? <div style={{ paddingTop: '15px' }}>Cart Is Empty...</div>
                :
                <tbody>
                  {data.menuSlice.menuList.length >= 0 ?
                    data.menuSlice.menuList?.map((pItem, index) => (
                      <tr key={index.toString()}>
                        <td>
                          <button onClick={() => addExistingItem(pItem)}>+</button>
                          <button onClick={() => removeExistingItem(pItem)}>-</button>
                        </td>
                        <td><img src={pItem.itemImg} alt="" /></td>
                        <td>{pItem.itemName}</td>
                        <td>{pItem.itemPrice}</td>
                        <td>{pItem.itemDescription}</td>
                        <td>{pItem.itemType}</td>
                        <td>{pItem.quantity}</td>
                        <td><button className='tableCrros' onClick={() => removeItem(pItem.id)}>X</button></td>
                      </tr>
                    ))
                    : <p>Card is Empty</p>
                  }
                </tbody>
              }
            </table>
          </div>
        </div> */}

      </div>
    </div>
  );
}

export default Checkout;



