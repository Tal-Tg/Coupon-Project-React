
import React from 'react'
import { Route, Router, Switch, useHistory } from 'react-router';
import AdminPage from '../AdminPage';


import CompanyPage from '../CompanyPage';
import CustomerPage from '../CustomerPage';
import HomePage from '../HomePage/HomePage';


import  Login  from '../Login/Login';
import Logout from '../logout/Logout';
import Search1 from '../Search';
import SlideTest from '../Slider';



function Routing(): JSX.Element {
    const history = useHistory();
    return (
        <div className="Routing">
            <Router history={history}>
                <Switch>
                    <Route path="/HomePage" component={HomePage} exact />
                    <Route path="/My-PersonalA" component={AdminPage} exact />
                    <Route path="/My-PersonalC" component={CompanyPage} exact />
                    <Route path="/My-PersonalCU" component={CustomerPage} exact />
                    
                    {/* <Route path="/HomePage" component={Logout} exact /> */}
                    <Route path="/Logout" component={Logout} exact /> 

                    {/* <Route path="/" component={HomePage} exact /> */}
                    {/* <Route path="/Login" component={Login} exact /> */}
                    {/* <Route path="/Search" component={Search1} exact />
                    <Route path="/Test" component={SlideTest} exact />
                    <Route path="/Logout" component={Logout} exact /> */}
                    {/* <Route path="/register" component={Register} exact />
                    <Route path="/Logout" component={Logout} exact />
                    <Route path="/My-Personal-Details" component={PersonalDetils} exact />
                    <Route path="/" component={HomePage} exact /> */}
                    {/* <Route path="/" component={HomePage} exact /> */}
                </Switch>
            </Router>
        </div>
    );
}

export default Routing;

