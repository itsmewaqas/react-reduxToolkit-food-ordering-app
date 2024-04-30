import { useState, useEffect } from 'react';
import {
    useNavigate,
    Link
} from "react-router-dom";
import RestaurantList from '../components/RestaurantList';
import LocationSelect from '../components/LocationSelect';
import { addRestaurant, removeRestaurant } from '../redux/slices/restaurantSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidStar, BiPlusCircle, BiXCircle, BiCart } from "react-icons/bi";

function OrderOnline() {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state) => state);
    console.log('data', data);

    const notify = () => toast.error("Please Select Branch", {
        position: "bottom-right",
        theme: "dark"
    });

    const [getLocation, SetgetLocation] = useState('');
    const [selectErr, SetselectErr] = useState(false);
    const [getid, Setgetid] = useState('');

    const selectLoction = (e, id) => {
        if (e.target.value == "Select") {
            notify()
        }
        else {
            Setgetid(id);
            SetgetLocation(e.target.value);
        }
    };

    const goToRestaurantDetail = (item) => {
        if (getLocation == '' || item.id != getid) {
            SetselectErr({ selectErr: true });
            notify()
        }
        else {
            const filterBranch = item.branches.filter((x) => x == getLocation);
            const dataFilter = {
                id: item.id,
                category: item.category,
                name: item.name,
                branches: filterBranch == '' ? item.branches : filterBranch,
                picture: item.picture,
                rating: item.rating,
                menuList: item.menuList,
            }
            dispatch(addRestaurant(
                dataFilter
            ))
            navigate('/OrderOnlineDetails', { state: dataFilter });
        }
    }

    const goToSelectedMenu = (item) => {
        navigate('/OrderOnlineDetails', { state: item });
    }

    const cancelRes = (item) => {
        dispatch(removeRestaurant(
            item.id
        ))
    }

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>OrderOnline</h1>
            <ToastContainer />
            <div className='reservationListBlock' style={{ marginTop: '50px' }}>
                <ul>
                    {RestaurantList.map((item, index) => (
                        <li key={index.toString()}>
                            <img src={item.picture} alt="" />
                            <h1>{item.name}
                                <span><BiSolidStar color="#efe05c" size={16} /> {item.rating}</span></h1>
                            <LocationSelect
                                menuData={item.branches}
                                handleDropdown={(e) => selectLoction(e, item.id)} />
                            {data.restaurantSlice.restaurantList.some((x) => (x.id == item.id)) ?
                                <button
                                    className='cartBtn2'
                                    disabled={
                                        data.restaurantSlice.restaurantList.length == 0 ? true :
                                            data.menuSlice.menuList.length == 0 ? true :
                                                data.restaurantSlice.restaurantList.some((x) => (x.id !== item.id))
                                    }
                                    onClick={() => goToSelectedMenu(item)}>
                                    <BiCart size={16}  /> Menu
                                </button>
                                :
                                <button
                                    className='cartBtn1'
                                    disabled={data.restaurantSlice.restaurantList.some((x) => (x.id !== item.id))}
                                    onClick={() => goToRestaurantDetail(item)}>
                                     <BiPlusCircle size={16} /> Add
                                </button>
                            }
                            {data.restaurantSlice.restaurantList.some((x) => (x.id == item.id)) ?
                                <button
                                    disabled={
                                        data.menuSlice.menuList.length > 0 ? true : false}
                                    className='cartBtn2' onClick={() => cancelRes(item)}> 
                                    <BiXCircle size={16}  /> Cancel
                                </button>
                                : null}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default OrderOnline;


