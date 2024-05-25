import React from 'react';
import Lottie from "lottie-react";
import animationData from '../../../../assets/Helps/content/Change/change.json'

const Change = () => {
    return (
        <>
            <div
                className={'gray-animations'}>
                <Lottie
                animationData={animationData}
            />
            </div>
        </>
    );
};

export default Change;