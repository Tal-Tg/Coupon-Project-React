
import { BrowserRouter, Link, Router } from 'react-router-dom'
import { GlobalStyle } from '../../globalStyle'
import { DivContainer,DivLocation,DivAmountBuyersCount,
    DivSpanForTwo,DivAmountBuyers, DivWrapper,DivImage,
    DivSpan,DivH1,DivText,DivSpan2,DivSpanText,DivSpanTextHeader,
    DivTextInfo,DivAmountDeprecated,DivLetterFrom,
    DivLetterFromPrice, DivLetterFromPriceIcon,DivButton,DivButton2,DivLink
 } from './HomePageElements'

import Feature from '../Feature'
import Footer from '../Footer'
import Header from '../Header'
import Hero from '../Hero'
import { Products } from '../Products'
import { productData, productDataTwoForHomePage,productData2,productDataTwoForHomePage2 } from '../Products/data'
import {FaChevronLeft} from 'react-icons/fa'
import React from 'react'
import './index.css';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';


function HomePage() {
    return (
        <div>
            <GlobalStyle/>
            <Header/>
            <Hero />
            <DivContainer>
                <DivWrapper>   
                <DivH1>Don't Miss </DivH1>
                {productDataTwoForHomePage.map((index, item) => {
                    return(
                    <DivSpan>
                     <DivLink to="/"> 
                    <DivSpan2 >
                        <DivImage src={index.img} alt=""/>
                        <DivText > 
                        <DivSpanTextHeader>Groceries from the <br /> supermarket </DivSpanTextHeader>
                        <DivSpanText> Eliran Supermarket  </DivSpanText>
                        <DivTextInfo>  enjoy from all the services of<br /> supermarket including, fruits<br /> </DivTextInfo>
                        <DivAmountBuyers><DivLocation><img className="imgForLocation" src="https://media.groo.co.il/_media/images/header/icon-location.png"/></DivLocation>&nbsp; Shopping  <DivAmountBuyersCount>Bought:&nbsp;502+</DivAmountBuyersCount></DivAmountBuyers>
                        <DivAmountDeprecated>202₪</DivAmountDeprecated>
                        <DivLetterFrom>from- <DivLetterFromPrice> 54</DivLetterFromPrice> <DivLetterFromPriceIcon> ₪</DivLetterFromPriceIcon> </DivLetterFrom>
                        <DivButton>More info</DivButton>
                        </DivText>
                    </DivSpan2 >
                    </DivLink>  
                    </DivSpan>
                        );
                    })}
                    {productDataTwoForHomePage2.map((index, item) => {
                    return(
                    <DivSpanForTwo>
                         <DivLink to="/">
                    <DivSpan2 >
                        <DivImage src={index.img} alt=""/>
                        <DivText > 
                        <DivSpanTextHeader>All in one Make-Up </DivSpanTextHeader>
                        <DivSpanText> sephora </DivSpanText>
                        <DivTextInfo>  enjoy from color with <br /> a contour palette,<br />For a natural look,<br /> stick to mascara, <br />a very light eyeshadow <br /> </DivTextInfo>
                        <DivAmountBuyers><DivLocation><img className="imgForLocation" src="https://media.groo.co.il/_media/images/header/icon-location.png"/></DivLocation>&nbsp; Shopping  <DivAmountBuyersCount>Bought:&nbsp;1028+</DivAmountBuyersCount></DivAmountBuyers>
                        <DivLetterFrom>from- <DivLetterFromPrice> 88</DivLetterFromPrice> <DivLetterFromPriceIcon> ₪</DivLetterFromPriceIcon> </DivLetterFrom>
                        <DivButton2>More info</DivButton2>
                        </DivText>
                    </DivSpan2 >
                    </DivLink>
                    </DivSpanForTwo>
                    );
                })}
                </DivWrapper>
            </DivContainer>
            <Products heading='New on *Coupon*' data={productData}/>
            <Products heading='User Selecting' data={productData}/>
            <Products heading='Sport' data={productData}/>
            <Feature/>
            <Products heading='Choose your favorite' data={productData}/>
            <Footer/>
        </div>
    )
}

export default HomePage;




