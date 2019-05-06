;
/*Data Verification Functions*/

/*
Permits only alphabetic characters (English, Ukrainian, Russian alphabet) and delimiter characters
 */
function delIncorrectSimvol(e) {
    // спец. сочетание - не обрабатываем
    let key = e.key;
    if (e.ctrlKey || e.altKey || e.metaKey || key === 'Backspace' || key === 'Enter' || !key) return;
    let reg = new RegExp('[\\sA-Za-zА-Яа-яіІєЄйЙїЇЁёыЫЭэ`ʼ-]');
    if (key.search(reg) === -1) e.preventDefault();
}

/*Remove extra whitespace characters*/
function trim(text) {
    text = text.trim();
    return text.replace(/\s+/g, " ");
}

/*Conversion of the first / last name string to the correct form (first capital letters)
* Works with several words in case the name contains several words.
* or consists of words separated by an apostrophe or a hyphen*/
function formattingName(text) {
    let newText="";
    let offset = 0;

    //the creation of an array of words that begin with a capital letter
    let words = text.toLowerCase().split(/[\s`ʼ-]+/)
        .map(word=>word.charAt(0).toUpperCase()+word.slice(1));

    //connecting words back through the characters that were originally
    for(let i=0; i<words.length-1; i++){
        offset+=words[i].length;
        newText+=words[i];
        newText+=text.charAt(offset++);
    }
    newText+=words[words.length-1];

    return newText;
}

/*General validation*/
function textCorrect(e){
    let text = e.target.value;
    text = trim(text);
    text = formattingName(text);
    event.target.value = text;
    setToLocale(event.target.name, event.target.value);
}

/*Setting the maximum date, depending on the current*/
function getMaxDate(years){
    let curDate = new Date();
    let month = curDate.getMonth()+1;
    return `${curDate.getFullYear()-years}-${(month<10)&&'0'+month}-${curDate.getDate()}`;
}

/*Validation of the entered country name*/
let isCountryCorrect = (country)=>{
    let countries = [].map.call(document.querySelectorAll(
        '#country-list option'), (country)=>country.innerText);

    let errorBlock = document.querySelector(".country-error");
    if(countries.includes(country)){
        setToLocale('country', country );
        errorBlock.innerText = "";
    }
    else{
        errorBlock.innerText = "Unknown country name. Please select country from the list.";
        return false;
    }
};

/*Retrieving selected course data*/
let getCheckedCourses = ()=>{
    let courses;
    //can't change to short style because the list that returned from querySelectorAll() not support method map()
    courses = [].map.call(document.querySelectorAll("[name='course']:checked"),
            (elem)=>{return elem.value});

    return courses.length? courses: null;
};

/*Check if at least one course is selected*/
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

/*Check if the gender is selected*/
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


