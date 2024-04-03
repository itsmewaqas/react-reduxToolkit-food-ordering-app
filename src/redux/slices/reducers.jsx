import { combineReducers } from "@reduxjs/toolkit";
import userDetail from "./userDetail";
import loginDetail from "./loginDetail";
import restaurantSlice from "./restaurantSlice";
import menuSlice from "./menuSlice";

const rootReducer = combineReducers({
    userDetail: userDetail,
    loginDetail: loginDetail,
    restaurantSlice: restaurantSlice,
    menuSlice: menuSlice,


});

export default rootReducer;