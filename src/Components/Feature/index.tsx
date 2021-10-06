import React from 'react'
import {FeatureContainer,FeatureButton,DivForNothing} from './FeatureElements'

const Feature = () => {
    return (
        <div>
        <DivForNothing>.</DivForNothing>
        <DivForNothing>.</DivForNothing>
        <FeatureContainer>
            <h1> Feeling lazy to cook? </h1>
            <p> Truffle alferdo sauce tooped with 24 carat gold dust.</p>
            <FeatureButton>Order Now</FeatureButton>
        </FeatureContainer>
        <DivForNothing>.</DivForNothing>
        <DivForNothing>.</DivForNothing>
        </div>
    )
}

export default Feature;
