import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addToCart, incrementItem, decrementItem, removeToCart, ordersuccess } from '../redux/slices/menuSlice';
import { clearRestaurant } from '../redux/slices/restaurantSlice';
import validateInfo from '../components/validation';
import Card from '../components/Card';

function Checkout(props) {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo({ values }));
    if (values.name != '' &&
      values.email != '' &&
      values.cell != '' &&
      values.address != '' &&
      values.zipcode != '' &&
      values.paymentMethod != '') {
      Setfinaldata(values);
      if (values) {
        setValues({
          name: '',
          email: '',
          cell: '',
          address: '',
          zipcode: '',
          paymentMethod: '',
        })
        setTimeout(() => {
          dispatch(ordersuccess());
          dispatch(clearRestaurant());
          SetsuccessBox(true);
        }, 1000);
      }
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
        <form onSubmit={handleSubmit}>
          <div className='checkoutleftblock'>
            <h2>Devilery information</h2>
            {data.menuSlice.menuList.length == 0 ? null :
              <div>
                <h2>before order placing fill required field otherwise order does not place!</h2>
                <div className='gridContainer1'>
                  <div className='fieldBox'>
                    <label>Name</label>
                    <input type='text' name='name' onChange={handleChnage} />
                    {errors.name && <p className='error'>{errors.name}</p>}
                  </div>
                  <div className='fieldBox'>
                    <label>Email</label>
                    <input type='email' name='email' onChange={handleChnage} />
                    {errors.email && <p className='error'>{errors.email}</p>}
                  </div>
                  <div className='fieldBox'>
                    <label>Cell</label>
                    <input type='text' name='cell' onChange={handleChnage} />
                    {errors.cell && <p className='error'>{errors.cell}</p>}
                  </div>
                  <div className='fieldBox'>
                    <label>Zip code</label>
                    <input type='text' name='zipcode' onChange={handleChnage} />
                    {errors.zipcode && <p className='error'>{errors.zipcode}</p>}
                  </div>
                  <div className='textareaBox'>
                    <label>Devilery Address</label>
                    <textarea rows="4" name='address' onChange={handleChnage}></textarea>
                    {errors.address && <p className='error'>{errors.address}</p>}
                  </div>
                  <div className='radiolist'>
                    <label>Select Payment Method</label>
                    <div className='radiolist'>
                      <label className=''>
                        <input type="radio" name='paymentMethod' checked={values.paymentMethod === 'cashOnDevilery'} value="cashOnDevilery" onChange={handleChnage} />
                        Cash On Devilery</label>
                      <label className=''>
                        <input type="radio" name='paymentMethod' checked={values.paymentMethod === 'onlinePayment'} value="onlinePayment" onChange={handleChnage} />
                        Online Payment </label>
                    </div>
                  </div>
                </div>

                {data.menuSlice.selectedCard == 0 ? null
                  :
                  <div className='radiolist'>
                    <label><input type='radio' name='paymentMethod' checked={values.paymentMethod === 'selectOnlinePayment'} value="selectOnlinePayment" onChange={handleChnage} /> </label>
                    <label>{data.menuSlice.selectedCard.replacedcardNumber}</label>
                    <label>{data.menuSlice.selectedCard.expiryDate}</label>
                    <label>{data.menuSlice.selectedCard.cvc}</label>
                    <label>{data.menuSlice.selectedCard.cardHolderName}</label>
                  </div>}
                {errors.paymentMethod && <p className='error'>{errors.paymentMethod}</p>}
                {values.paymentMethod == 'onlinePayment' ?
                  <div>
                    <Card />
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
              <button type='submit'
                disabled={values.paymentMethod == 'onlinePayment' ? true :
                  values.paymentMethod == 'selectOnlinePayment' ? false : null}>Confirm Order</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;



