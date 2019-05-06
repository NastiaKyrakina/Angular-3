;
//Functions for working with local memory

//Store item in local memory
const setToLocale = (name, value) => {
    try{
        if(value instanceof Object){
            value =  JSON.stringify(value);
        }
        localStorage.setItem(name, value);
    }
    catch (error) {
        console.log(error);
    }
};

//Data retrieval
const getFromLocale = (name) => {
    try{
        return localStorage.getItem(name);
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

//Getting data object
const getObjFromLocale = (name) => {
    return JSON.parse(getFromLocale(name));
};


const deleteKeyFromLocale = (name)=>{
    localStorage.removeItem(name);
};



