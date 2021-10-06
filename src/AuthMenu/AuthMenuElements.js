import styled from 'styled-components';
import {MdClose} from 'react-icons/md'


export const CloseModelButton = styled(MdClose)`
    cursor:pointer;
    position:absolute;
    top:8%;
    right:36.2%;
    // width:32px;
    // height:32px
    position:fixed;
    padding:0;
    z-index:10;
    color:black;
    font-size:2vw;
    //   background:white;

    @media (min-width: 1200px) {
        max-width:20%;
    }
    `;