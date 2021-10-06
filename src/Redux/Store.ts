import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { AdminReducer } from "./AdminState";
import { CouponReducer } from "./CouponState";
import { AdminCustomerReducer } from "./AdminCustomerState";
import { CompanyReducer } from "./CompanyState";
import { CustomerReducer } from "./CustomerState";






const reducers = combineReducers({authState: authReducer,couponsState: CouponReducer,adminState : AdminReducer,adminCustomerState : AdminCustomerReducer, companyState : CompanyReducer
,customerState:CustomerReducer,});
const store = createStore(reducers)

export default store;