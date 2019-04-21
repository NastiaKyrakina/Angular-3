
function getMinDate(years){
    let curDate = new Date();
    let month = curDate.getMonth()+1;
    return `${curDate.getFullYear()-years}-${(month<10)&&'0'+month}-${curDate.getDate()}`;
}

function setRangeValue(value){
    document.querySelector("output[for='mark']").innerText=value;
}

(function () {
    //import {delIncorrectSimvol, textCorrect} from "./validation";

    const STATUS = "status";
    const MIN_AGE = 8;

   (function init(){
       let inputFName = document.getElementById("fname");
       let inputLName = document.getElementById("lname");
       let inputDate = document.getElementById("date");
       let inputRange = document.getElementById("mark");
       inputFName.addEventListener("keydown", delIncorrectSimvol);
       inputFName.addEventListener("blur", (e)=>textCorrect(e));

       inputLName.addEventListener("keydown", delIncorrectSimvol);
       inputLName.addEventListener("blur", (e)=>textCorrect(e));

       inputDate.setAttribute("max", getMinDate(MIN_AGE));
       console.log(inputDate);

       inputRange.addEventListener("input", (e)=>setRangeValue(e.target.value));

    })();






    //Общие ф-и для работы с проверками
    //Общий сбор данных

    //Отправка на сервер
   function sendData(data) {
        let progress = document.querySelector('.send-status');
        progress.classList.add('progress');
        new Promise((resolve)=>setTimeout(resolve, 2000)).
        then((res)=>fetch('https://my-json-server.typicode.com/NastiaKyrakina/Angular-3/users/', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response=>{
            if(response.ok){
                setToLocale(STATUS, 'susses');
                progress.classList.remove('progress');
                displaySussesWindow();
            }
            else{
                new Error('Network response was not ok.');
            }
        })
            .catch(error =>
        {console.log(error.message);}
        ));

    }


//отображения данных
    function displaySussesWindow(){
      //  let form = document.querySelector('form');
      //  form.style = "display:none";

        let panel = document.querySelector('.susses');
        panel.style = "display:block";

    }

    let ready = event =>{
        let cur_status = getFromLocale(STATUS);
        if(cur_status==="susses"){
            displaySussesWindow();
        }
        if(cur_status==="progress"){
           // fillField();
        }
    };

    document.addEventListener("DOMContentLoaded", ready);






    let getCheckedCourses = ()=>{
        let courses;
        courses = [].map.call(document.querySelectorAll("[name='course']:checked"),
                (elem)=>{return elem.value});

        return courses.length? courses: null;
    };

    let isCoursesCorrect = ()=>{
        let courses = getCheckedCourses();
        if(!courses){
            let errorBlock = document.querySelector(".courses-error");
            errorBlock.innerText = "Please select at least one course.";
            return false;
        }
        return courses;
    };

    let isGenderCorrect = ()=>{

        let gender;
        try{
            gender = document.querySelector("[name='gender']:checked").value;

        }
        catch (e) {
            console.log(e.message);
            let errorBlock = document.querySelector(".gender-error");
            errorBlock.innerText = "Please choose your gender.";
        }
        return gender;
    };

    let getData = () => {

        let data = {};
        data.fname = document.getElementById("fname").value;
        data.lname = document.getElementById("lname").value;
        data.date = document.getElementById("date").value;

        data.gender = isGenderCorrect();



        data.email = document.getElementById("email").value;
        data.country = document.getElementById("country").value;

        data.about = document.getElementById("about").value;
        data.address = document.getElementById("address-1").value +
            document.getElementById("address-2").value;

        data.mark = document.getElementById("mark").value;

        data.curses = isCoursesCorrect();
        if(!data.curses){
            return false;
        }

        if(data.curses.lenght == 0){
            //исключение
        }

      return data;
    };


    let elem = document.getElementById('lname');

elem.addEventListener("blur",
    (event)=>{
    console.log(event.target.value);
    window.localStorage.setItem('lname', event.target.value);
        /*
    fetch('https://my-json-server.typicode.com/NastiaKyrakina/Angular-3/users/3')
            .then(response => response.json())
            .then(data => console.log(JSON.stringify(data)));

        let elem = fetch('https://my-json-server.typicode.com/NastiaKyrakina/Angular-3/users/', {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify({
                id: '3',
                name: 'Elon Musk'
            })
        });
        console.log(elem);

*/
} );


let form = document.getElementsByTagName("form")[0];
    console.log(form.elements);

//Очистка текстовых полей
form.addEventListener("click", function(e){
    //если нажата кнопка для очистки полей
    //очищаеться элемент ввода перед кнопкой
    if(e.target.getAttribute("data-action")==="clean"){
        let text_field = e.target.previousElementSibling;
        if(text_field.tagName==="INPUT" || text_field.tagName==="TEXTAREA"){
            text_field.value='';
        }
    }
});
/*При сабмите формы
1. Сохранять данные формы в LocaleSrt
2. Отправлять данные по адресу ....
 */

function submitForm(event) {
    event.preventDefault();
    let data = getData();
    if(data){
    sendData(data);
    }
}

form.addEventListener('submit', submitForm);

})();

/*
* "name": "222",
* "age": "111"
* name of group
* "fac": ['f', 't', 'fge'].
* name of group
* 'opt': 'f'
*
* */



