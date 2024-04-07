import React from 'react';
import Lottie from "lottie-react";
import animationData from '../../../../assets/Helps/content/Referrals/referrals.json'

const Referrals = () => {
    return (
        <>
            <Lottie
                animationData={animationData}
            />
        </>
    );
};

export default Referrals;