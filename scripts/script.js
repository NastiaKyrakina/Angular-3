(function () {

    const STATUS = "status";

    //отображения окна об успешной регистрации
    let displaySussesWindow = ()=>{
        let form = document.querySelector('.form-block');
        form.style = "display:none";
        let panel = document.querySelector('.susses');
        panel.style = "display:block";

        let name = getFromLocale('fname')+' '+getFromLocale('lname');
        document.getElementById("user-name").innerText = name;
    };

    //отображение формы
    let displayForm = ()=>{
        let form = document.querySelector('.form-block');
        form.style = "display:block";
        let panel = document.querySelector('.susses');
        panel.style = "display:none";
    };

    //Заполнение полей данными из локальной памяти
    function fillField(){

        /*Заполнение всех текстовых полей*/
        let inputField = document.querySelectorAll("[type='text'], " +
            "[type='email'], [type='date'], " +
            "[type='range'], textarea");
        inputField.forEach(field=>{
            let value = getFromLocale(field.name);
            console.log(value);
            if(value){
                field.value = value;
            }
        });

        /*установка полей переключателей*/
        let value = getFromLocale('gender');
        if(value){
            document.querySelector(`[name='gender'][value='${value}']`).checked=true;
        }

        /*установка чекбоксов*/
        let values = getObjFromLocale('course');
        if(values) {
            values.forEach(value => {
                document.querySelector(`[name='course'][value='${value}']`).checked=true;
            });
        }
    }

    // возвращение к полю заполнения формы
    let goBack = (e)=>{
        localStorage.clear();
        document.forms[0].reset();
        let errors = document.querySelectorAll(".error");
        for (let i=0; i<errors.length; i++) {
            errors[i].innerText="";
        }
        displayForm();
    };

    //Отправка данных на сервер
   function sendData(data) {
        let progress = document.querySelector('.send-status');
        progress.classList.add('progress');

        //искусственная задержка
        new Promise((resolve)=>setTimeout(resolve, 2000)).
        then((res)=>
            fetch('https://my-json-server.typicode.com/NastiaKyrakina/Angular-3/users/', {
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
            .catch(error =>{
                console.log(error.message);}
        ));
    }

    /*При загрузке страницы*/
    let ready = event =>{
        init();
        let cur_status = getFromLocale(STATUS);
        //если форма отправлена успешно, отображаем соответствующее окно
        if(cur_status==="susses"){
            displaySussesWindow();
        }
        else {

            //если форма заполняеться, но ещё не отправлена, заполняем её данными
            if(cur_status==="progress"){
                fillField();
            }
            setToLocale(STATUS,"progress");
        }
    };


    /*Сбор и проверка данных*/
    let getData = () => {
        let data = {};
        data.fname = getFromLocale('fname');
        data.lname = getFromLocale('lname');
        data.date = getFromLocale('date');
        data.email = getFromLocale('email');
        data.country = getFromLocale('country');
        data.address = getFromLocale('address-1')+getFromLocale('address-2');

        data.mark = document.getElementById("mark").value;
        data.gender = isGenderCorrect();
        data.curses = isCoursesCorrect();
        if(!data.gender || !data.curses){
            return false;
        }

        for(let key in data){
            if(data.hasOwnProperty(key) && data[key]===null){
                return false;
            }
        }

        data.about = getFromLocale('about');

        return data;
    };

    let form = document.getElementsByTagName("form")[0];

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

    /*Событие при сабмите формы*/
    function submitForm(event) {
        event.preventDefault();
        let data = getData();
        let errorBlock = document.querySelector(".form-error");
        if(data){
            errorBlock.innerText="";
            sendData(data);
        }
        else{
            errorBlock.innerText = "Oops! You have left some fields blank, please check and fill them out.";
        }
    }

    /*Привязка событий*/
    document.addEventListener("DOMContentLoaded", ready);
    form.addEventListener('submit', submitForm);

    let backButton = document.getElementById("back");
    backButton.addEventListener('click', goBack);

    document.querySelector(".btn-reset").addEventListener('click', (e)=>{
        localStorage.clear();
        setToLocale(STATUS,"progress");
    })


})();


