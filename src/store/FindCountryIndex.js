const findCountryIndex = (value, array) => {
    for(let i = 0; i < array.length; i++){
        if(array[i].alpha3Code === value){
            return i;
        }      
    }
    return -1;
}

export default findCountryIndex;