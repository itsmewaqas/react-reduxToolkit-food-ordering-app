import React, { useState, useEffect,useRef } from 'react';
import {
  useNavigate,
  Link,
  NavLink
} from "react-router-dom";
import { Form } from 'react-bootstrap';
import logo from '../assets/images/logo.png';
import { BiMenuAltLeft, BiLogOutCircle,BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/loginDetail';
import { removeToCart } from '../redux/slices/menuSlice';
import { Scrollbars } from 'react-custom-scrollbars-2';

function DashHeader(props) {

  const dispatch = useDispatch();

  const data = useSelector((state) => state);

  let navigate = useNavigate();

  const [menuCollapse, menuCollapseSet] = useState(false);

  const menuCollapsed = () => {
    menuCollapseSet({ menuCollapse: !menuCollapse });
    props.sidebarCtrlFunc();
  }

  const userLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/');
  }

  const [items, Setitems] = useState([]);
  const [basketMenu, setBasketMenu] = useState(false);
  const [responsiveMenu, SetresponsiveMenu] = useState("resMenuShow");

  const catMenu = useRef(null)
  const closeOpenMenus = (e) => {
    if (catMenu.current && basketMenu && !catMenu.current.contains(e.target)) {
      setBasketMenu(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus)


  const showCart = () => {
    setBasketMenu(!basketMenu)
  }

  const removeItem = (id) => {
    const newList = data.menuSlice.menuList.filter((item) => item.id !== id);
    Setitems(newList);
    dispatch(removeToCart(
      id
    ))
  }

  const getTotal = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal = subtotal + (item.itemPrice * item.quantity)
    })
    return subtotal;
  }

  const viewToCheckout = () => {
    navigate('/Checkout');
    setBasketMenu(false);
  }

  useEffect(() => {
  }, [])



  return (
    <div className='dHeader'>
      <div className="logoArea">
        <a><img className='logo' src={logo} alt='' /> </a>
      </div>
      <a onClick={() => menuCollapsed()} className='hamburger'><BiMenuAltLeft size={30} /></a>
      <button onClick={() => userLogout()} className='headerLogout'><BiLogOutCircle /></button>
      <a onClick={() => showCart()} className='menuBasket'><BiCart size={22} color='#000' /><span>{data.menuSlice.menuList.length}</span></a>
      {basketMenu && <div className='cartMenu' ref={catMenu}>
        {data.menuSlice.menuList.length == 0 ? <dd>Cart Is Empty...</dd>
          :
          <div>
            <Scrollbars style={{ height: 250 }}>
              <ul>
                {data.menuSlice.menuList.length >= 0 ?
                  data.menuSlice.menuList?.map((pItem, index) => (
                    <li key={index.toString()}>
                      <img src={pItem.itemImg} alt="" />
                      <p>{pItem.itemName}
                        <span>Price: ${pItem.itemPrice}</span></p>
                      <button onClick={() => removeItem(pItem.id)}>X</button>
                    </li>
                  ))
                  : <p>Card is Empty</p>
                }
              </ul>
            </Scrollbars>
            <dd>Total Amount :${getTotal(data.menuSlice.menuList)}</dd>
            <button className='checkOutBtn' onClick={() => viewToCheckout()}>Proceed To Checkout</button>
          </div>
        }
      </div>}
    </div>
  );
}

export default DashHeader;