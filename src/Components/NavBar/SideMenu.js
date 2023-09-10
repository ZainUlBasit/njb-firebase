import React, { useState } from 'react'
import styled from 'styled-components'
import {SideMenuList, IconWrapper, TitleWrapper} from './Styling/SideMenuStyling'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBarData from "./SideBarData"
import { Link } from 'react-router-dom'
import { isactiveMenu } from "../../store/SideMenuSlice";
import { useDispatch } from 'react-redux';

const SideMenu = () => {
  const dispatch = useDispatch();
  return (
    <SideMenuList>
        {
            SideBarData.map(item =>
                <li key={item.key}>
                    <Link 
                        to={item.path} 
                        className="LiLink"
                        onClick={() => dispatch(isactiveMenu())}
                    >
                        <FontAwesomeIcon 
                            icon={item.icon} 
                            style={{fontSize : "30px", paddingBottom: "6px"}} 
                        />
                        {item.title}
                    </Link>
                </li>
            )
        }
    </SideMenuList>
  )
}

export default SideMenu;