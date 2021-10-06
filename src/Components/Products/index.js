import React from 'react'
import {ProductsContainer,ProductHeading,ProductsWrapper,ProductCard,
    ProductImg,
    ProductInfo,DivAmountBuyersCount,DivLocation,DivLetterFromPrice,DivLetterFromPriceIcon,
    DivLetterFrom,DivAmountDeprecated,DivAmountDeprecated2,DivAmountBuyers, ProductTitle,ProductDesc,ProductPrice,ProductButton,DivForWhiteInUp
} from './ProductsElements';
import Carousel from "react-elastic-carousel";
import{ useState } from 'react'
import "./index.css";
import coupon1 from '../../images/coupon1.jpg';




export const Products = ({heading, data}) => {
    
    return (
        <ProductsContainer>
            <DivForWhiteInUp>.</DivForWhiteInUp>
            <ProductHeading> &nbsp;&nbsp;&nbsp;&nbsp;{heading}</ProductHeading>
            <ProductsWrapper>
            {data.map((product, index) => {
                return(
                    <ProductCard key={index} >
                        <ProductImg src={product.img} alt={product.alt}/>
                        <ProductInfo>
                            <ProductTitle>{product.name} <DivAmountDeprecated>{product.alt}₪</DivAmountDeprecated></ProductTitle>
                            <DivLetterFrom>from- <DivLetterFromPrice> {product.price}</DivLetterFromPrice> <DivLetterFromPriceIcon> ₪</DivLetterFromPriceIcon> </DivLetterFrom>
                            <DivAmountBuyers><DivLocation><img className="imgForLocation" src="https://media.groo.co.il/_media/images/header/icon-location.png"/></DivLocation>&nbsp; Shopping  <DivAmountBuyersCount>Bought:&nbsp;502+&nbsp;  </DivAmountBuyersCount></DivAmountBuyers>
                            {/* <ProductDesc>{product.desc}</ProductDesc> */}
                            {/* <ProductPrice>{product.price}</ProductPrice> */}
                            {/* <ProductButton>{product.button}</ProductButton> */}
                        </ProductInfo>
                    </ProductCard>
                
                );
            })}
            </ProductsWrapper>
        </ProductsContainer>
    )
}


