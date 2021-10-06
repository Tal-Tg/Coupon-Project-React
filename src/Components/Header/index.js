import React, {useState} from 'react';
import AuthMenu from "../../AuthMenu/AuthMenu";
import {HeaderContainer,HeaderWrap,NavIcon1} from './HeaderElements'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar'



function Header() {
    const [isOpen,setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
        <HeaderContainer>
            <HeaderWrap>
                <AuthMenu/> 
            <Navbar toggle={toggle} />
            <Sidebar isOpen={isOpen} toggle={toggle}/>
            </HeaderWrap>
        </HeaderContainer>
        </div>
    )
}

export default Header;



