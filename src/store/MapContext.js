import React, { useState, createContext, useEffect } from 'react';
import customData from './customData.json';
import axios from 'axios';
import Loading from '../Loading/Loading';





export const MapContext = createContext();


export const CountryDataProvider = props => {
    const [cData] = useState(customData);
    const [apiData, setApiData] = useState();
    const [countryData, setCountryData] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const baseURL = 'http://api.currencylayer.com/';
            const key = `?access_key=${process.env.REACT_APP_CURRENCY_API_KEY}`;
            const { data: { timestamp, source, quotes } }  = await axios.get(`${baseURL}live${key}`)
            const quoteData = Object.entries(quotes)
            quoteData.forEach(quote => {
                let key = quote[0]
                let alteredKey = key.slice(3,6)
                quote[0] = alteredKey
            })
            setApiData({timestamp, source, quoteData});
        }
        fetchData();
        
        
    }, [])

    if(apiData === undefined){
        <>
        console.log("should be loading")
        <Loading />
        </>
    }
    else{
       cData.forEach(country => {
            let rateArray = [];
            let apiQuote = apiData.quoteData //array of arrays;
            for(let i=0; i < country.currCode.length; i++){
                for(let j=0; j < apiQuote.length; j++){
                    if(country.currCode[i] === apiQuote[j][0]){
                        rateArray.push(apiQuote[j][1])
                    }   
                }
            }
            let countryDataObject = {
                "alpha3Code": country.alpha3Code,
                "name": country.name,
                "currName": country.currName,
                "currCode": country.currCode,
                "exchangeRate": rateArray,
                "currSymbol": country.currSymbol,
                "pegged": country.pegged,
                "territory": country.territory,
                "flag": country.flag
            }
            countryData.push(countryDataObject);          
       }) 
    }
    
    
    
    return <MapContext.Provider value={[countryData, setCountryData]}>{props.children}</MapContext.Provider>;
    
}

