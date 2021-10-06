import React from 'react'
import {SidebarContainer,Icon,CloseIcon,SidebarMenu,SidebarLink,SideBtnWrap,SidebarRoute  } from './SideBarElements'

export const Sidebar = ({isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarMenu>
                <SidebarLink to="/"> Coupons </SidebarLink>
                <SidebarLink to="/"> Recommended </SidebarLink>
                <SidebarLink to="/"> Contact-us </SidebarLink>
                <SidebarLink to="/"> Full Menu </SidebarLink>
                <SideBtnWrap>
                <SidebarRoute to="/"> Order Now </SidebarRoute>
            </SideBtnWrap>
            </SidebarMenu>

            
        </SidebarContainer>
    )
}

export default Sidebar;