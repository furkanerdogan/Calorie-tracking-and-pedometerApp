import React, { createContext, useState, useEffect } from 'react'

export const YemekContext = createContext();

export const Yemekprovider = ({ children }) => {
    const [product, setProduct] = useState([]);

    const addNutration = (item) => {
        setProduct((arr) => [...arr, item]);


    }
    console.log(product, "asdasdasda");
    return (

        <YemekContext.Provider

            value={{
                product,
                addNutration

            }}>

            {children}
        </YemekContext.Provider>
    )
    console.log("nutrationprovide", nutration);

}
