import React, { useState,useEffect,Fragment } from 'react';
import RestaurantList from '../components/RestaurantList';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { addToCart, incrementItem, decrementItem } from '../redux/slices/menuSlice';

function OrderOnlineDetails(props) {

    const location = useLocation();
    const itemDetail = location.state;

    const dispatch = useDispatch();

    const data = useSelector((state) => state);
    console.log('data',data.cartList);

    const [productItem, SetproductItem] = useState([]);

    const addItem = (item) => {
        SetproductItem(item => [...item]);
        dispatch(addToCart(
            item 
        ))
    }

    const addExistingItem = (item) => {
        console.log('call addExistingItem', item);
        dispatch(incrementItem(
            item
        ))
    }

    const removeExistingItem = (item) => {
        console.log('call removeExistingItem', item);
        dispatch(decrementItem(
            item
        ))
    }

    const [filterMenu, SetfilterMenu] = useState([]);
    useEffect(() => {
        const filterMenuList = RestaurantList.filter((x) => {
            return x.id == itemDetail.id;
        })
        SetfilterMenu(filterMenuList);
    }, []);

    //const filteredItems = data.cartList.filter((x) => x.id === item.id);

    return (
        <div>
            <h1>{itemDetail.name}</h1>
            <div className='reservationListBlock' style={{ marginTop: '50px' }}>
                <ul>
                    {filterMenu.map((item, index) => (
                        <Fragment key={index.toString()}>
                            {item.menuList.map((item, index) => (
                                <li key={index.toString()}>
                                    <img src={item.itemImg} alt="" />
                                    <h1>{item.itemName} <span>Price ${item.itemPrice}</span></h1>
                                    {data.menuSlice.menuList.filter(x => x.id == item.id).map(em => (
                                        <div className='qtyCtrl'>
                                            <button onClick={() => removeExistingItem(item)}>-</button>
                                            <p> Qty: {em.quantity}</p>
                                            <button onClick={() => addExistingItem(item)}>+</button>
                                        </div>
                                    ))}
                                    <button className='addBtn2'
                                        disabled={data.menuSlice.menuList.some((x) => (x.id == item.id))}
                                        onClick={() => addItem(item)}>Add To Cart</button>
                                </li>
                            ))}
                        </Fragment>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export default OrderOnlineDetails;