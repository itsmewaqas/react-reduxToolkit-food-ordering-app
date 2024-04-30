import React, { useState, useEffect } from 'react';
import {
  Routes,
  useLocation,
  Route
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import OuterDashboard from './components/OuterDashboard.jsx'
import Login from './outerRoutes/Login.jsx';
import InnerDashboard from './components/InnerDashboard.jsx';
import Home from './innerRoutes/Home.jsx';
import Users from './innerRoutes/Users.jsx';
import OrderOnline from './innerRoutes/OrderOnline.jsx';
import OrderOnlineDetails from './innerRoutes/OrderOnlineDetails.jsx';
import Checkout from './innerRoutes/Checkout.jsx';
import Reservations from './innerRoutes/Reservations.jsx';
import ReservationsDetails from './innerRoutes/ReservationsDetails.jsx';
import NoMatch from './NoMatch.jsx';

function Routers(props) {

  const { loginDetail } = useSelector((state) => state);
  console.log('get loginDetail', loginDetail);

  // const [auth, Setauth] = useState(
  //   { email: 'm.waqas@test.com', password: 'waqas123' }
  // );

  useEffect(() => {
  }, [])

  return (
    <div>
      <Routes>
        {loginDetail.isAuth == false ? 
          <Route path="/" element={<OuterDashboard />}>
            <Route exact path="/" element={<Login />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          :
          <Route path="/" element={<InnerDashboard />}>
            <Route exact path="/" element={<Home />} />
            <Route path="Home" element={<Home />} />
            <Route path="Users" element={<Users />} />
            <Route path="OrderOnline" element={<OrderOnline />} />
            <Route path="OrderOnlineDetails" element={<OrderOnlineDetails />} />
            <Route path="Checkout" element={<Checkout />} />
            <Route path="Reservations" element={<Reservations />} />
            <Route path="ReservationsDetails" element={<ReservationsDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        }
      </Routes>
    </div>
  );
}

export default Routers;
