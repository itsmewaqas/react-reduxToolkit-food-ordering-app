import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import validateInfo from './validation';
import { getCardData } from '../redux/slices/menuSlice';

function Card(props) {

    const dispatch = useDispatch();

    const initalState = {
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        cardHolderName: '',
    };

    const [values, setValues] = useState(initalState);
    const [errors, setErrors] = useState({});
    const [replacedcardNumber, SetreplacedcardNumber] = useState(null);

    const handleChnage = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const addCard = (e) => {
        e.preventDefault();
        setErrors(validateInfo({ values }));
        if (values.cardNumber != '' &&
            values.expiryDate != '' &&
            values.cvc != '' &&
            values.cardHolderName != '') {
            dispatch(getCardData({ ...values, replacedcardNumber: values.cardNumber.replace(/.(?=.{4,}$)/g, '*') }))
        }
        else {
            return false
        }
    }

    // useEffect(() => {
    //     if (values.cardNumber.length === 4) {
    //         SetreplacedcardNumber(values.cardNumber + ' ');
    //     } else if (values.cardNumber.length === 9) {
    //         SetreplacedcardNumber(values.cardNumber + ' ');
    //     } else if (values.cardNumber.length === 14) {
    //         SetreplacedcardNumber(values.cardNumber + ' ');
    //     }
    // }, [values.cardNumber]);

    return (
        <form>
            <div className='paymentform'>
                <div className='paymentfield1'>
                    <label>Card Number</label>
                    <input maxLength={16} className='paymentinput1' name='cardNumber' onChange={handleChnage} type='text' placeholder='0000 0000 0000 0000' />
                    {errors.cardNumber && <p className='error'>{errors.cardNumber}</p>}
                </div>
                <div className='paymentfield2'>
                    <label>Expiry Date</label>
                    <input className='paymentinput2' name='expiryDate' onChange={handleChnage} type='date' placeholder='MM/YY' />
                    {errors.expiryDate && <p className='error'>{errors.expiryDate}</p>}
                </div>
                <div className='paymentfield2'>
                    <label>CVC/CVV</label>
                    <input maxLength={3} className='paymentinput2' name='cvc' onChange={handleChnage} type='text' placeholder='***' />
                    {errors.cvc && <p className='error'>{errors.cvc}</p>}
                </div>
                <div className='paymentfield1'>
                    <label>Card Holder Name</label>
                    <input className='paymentinput1' name='cardHolderName' onChange={handleChnage} type='text' placeholder='Card Holder Fullname' />
                    {errors.cardHolderName && <p className='error'>{errors.cardHolderName}</p>}
                </div>
                <button onClick={addCard}>Add Card</button>
            </div>
        </form>
    );
}

export default Card;