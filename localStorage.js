;
//Функции для работы с памятью
//Сохранение в локальной памяти элемента
let setToLocale = (name, value) => {
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

let getFromLocale = (name) => {
    try{
        return localStorage.getItem(name);
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

let getObjFromLocale = (name) => {
    return JSON.parse(getFromLocale(name));
};
