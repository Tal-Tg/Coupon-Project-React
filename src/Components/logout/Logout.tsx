import { SlowBuffer } from "buffer";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logoutAction } from "../../Redux/AuthState";
import store from "../../Redux/Store";
import notify from "../../service/Notification";



function Logout(): JSX.Element {

    const history = useHistory();

    useEffect(()=> 
    { 
        notify.success('logout seccesfully');
        store.dispatch(logoutAction());
        store.getState().couponsState.coupons = [];
        store.getState().adminState.companies =[];
        history.push("/HomePage");
    });

    return (
        <></>
    );
}

export default Logout;