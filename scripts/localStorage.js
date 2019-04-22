;
//Функции для работы с локальной памятью

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

//Получение данных
let getFromLocale = (name) => {
    try{
        return localStorage.getItem(name);
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

//Получение объекта данных
let getObjFromLocale = (name) => {
    return JSON.parse(getFromLocale(name));
};



