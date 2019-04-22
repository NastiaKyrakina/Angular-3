;
/*Функции проверки данных*/

/*
   * Разрешает вводить только буквенные символы(английский, украинский, русский алфавит) и символы разделители
   * */
function delIncorrectSimvol(e) {
    // спец. сочетание - не обрабатываем
    let key = e.key;
    if (e.ctrlKey || e.altKey || e.metaKey || key === 'Backspace' || key === 'Enter' || !key) return;
    let reg = new RegExp('[\\sA-Za-zА-Яа-яіІєЄйЙїЇЁёыЫЭэ`ʼ-]');
    if (key.search(reg) === -1) e.preventDefault();
}

/*Удаление лишних пробельных символов*/
function trim(text) {
    text = text.trim();
    return text.replace(/\s+/g, " ");
}

/*Преобразование строки имени/фамилии к коректному виду (первые буквы заглавные)
*Работает с несколькими словами на случай если имя/фамилия содержат несколько слов
*или состоит из слов, разделенных апострофом или дефисом*/
function formattingName(text) {
    let newText="";
    let offset = 0;

    //создание массива из слов, которые начинаються с заглавной буквы
    let words = text.toLowerCase().split(/[\s`ʼ-]+/)
        .map(word=>word.charAt(0).toUpperCase()+word.slice(1));

    //соединение слов обратно через символы, которые были изначально
    for(let i=0; i<words.length-1; i++){
        offset+=words[i].length;
        newText+=words[i];
        newText+=text.charAt(offset++);
    }
    newText+=words[words.length-1];

    return newText;
}

/*Общая проверка ввода*/
function textCorrect(e){
    let text = e.target.value;
    text = trim(text);
    text = formattingName(text);
    event.target.value = text;
    setToLocale(event.target.name, event.target.value);
}

/*Установка максимальной даты, в зависимости от текущей*/
function getMaxDate(years){
    let curDate = new Date();
    let month = curDate.getMonth()+1;
    return `${curDate.getFullYear()-years}-${(month<10)&&'0'+month}-${curDate.getDate()}`;
}

/*Проверка корректности введенного названия страны*/
let isCountryCorrect = (country)=>{
    let countries = [].map.call(document.querySelectorAll(
        '#country-list option'), (country)=>country.innerText);

    let errorBlock = document.querySelector(".country-error");
    if(countries.indexOf(country)!==-1){
        setToLocale('country', country );
        errorBlock.innerText = "";
    }
    else{
        errorBlock.innerText = "Unknown country name. Please select country from the list.";
        return false;
    }
};

/*Получения данных выбранных курсов*/
let getCheckedCourses = ()=>{
    let courses;
    courses = [].map.call(document.querySelectorAll("[name='course']:checked"),
        (elem)=>{return elem.value});

    return courses.length? courses: null;
};

/*Проверка, выбран ли хотя бы один курс*/
let isCoursesCorrect = ()=>{
    let courses = getCheckedCourses();
    let errorBlock = document.querySelector(".courses-error");
    if(!courses){

        errorBlock.innerText = "Please select at least one course.";
        return false;
    }
    errorBlock.innerText="";
    setToLocale('course', courses);
    return courses;
};

/*Проверка, выбран ли пол*/
let isGenderCorrect = ()=>{

    let gender;
    try{
        gender = document.querySelector("[name='gender']:checked").value;
        setToLocale('gender', gender );
    }
    catch (e) {
        console.log(e.message);
        let errorBlock = document.querySelector(".gender-error");
        errorBlock.innerText = "Please choose your gender.";
    }
    return gender;
};


