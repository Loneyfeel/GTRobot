import React, {useState} from 'react';
import ChangeCrypto from './ChangeCrypto'

const FunctionalChangeCrypto = ({handleNextComponent}) => {
    return (
        <>
            <ChangeCrypto handleNextComponent={handleNextComponent}/>
        </>
    );
};

export default FunctionalChangeCrypto;