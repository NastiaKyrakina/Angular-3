(function () {

    const STATUS = "status";

    //display susses window
    const displaySussesWindow = ()=>{
        let form = document.querySelector('.form-block');
        form.style = "display:none";
        let panel = document.querySelector('.susses');
        panel.style = "display:block";

        document.getElementById("user-name").innerText =
            getFromLocale('fname')+' '+getFromLocale('lname');
    };

    //display form
    const displayForm = ()=>{
        let form = document.querySelector('.form-block');
        form.style = "display:block";
        let panel = document.querySelector('.susses');
        panel.style = "display:none";
    };

    //filled input-field with data from locale storage
    function fillField(){

        /*Fill all text field*/
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

        /*set radio field*/
        let value = getFromLocale('gender');
        if(value){
            document.querySelector(`[name='gender'][value='${value}']`).checked=true;
        }

        /*set checkbox field*/
        let values = getObjFromLocale('course');
        if(values) {
            values.forEach(value => {
                document.querySelector(`[name='course'][value='${value}']`).checked=true;
            });
        }
    }

    // open the clean form
    const goBack = (e)=>{
        localStorage.clear();
        document.forms[0].reset();
        let errors = document.querySelectorAll(".error");
        for (let i=0; i<errors.length; i++) {
            errors[i].innerText="";
        }
        document.querySelector("output").innerText = '1';
        displayForm();
    };

    //send data to server
   function sendData(data) {
        let progress = document.querySelector('.send-status');
        progress.classList.add('progress');

        //set timeout
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

    /*When page loaded*/
    const ready = event =>{
        init();
        let cur_status = getFromLocale(STATUS);
        // if form already was send, show susses window
        if(cur_status==="susses"){
            displaySussesWindow();
        }
        else {
            //if form in progress state, add data to field
            if(cur_status==="progress"){
                fillField();
            }
            setToLocale(STATUS,"progress");
        }
    };


    /*Get and check data*/
    const getData = () => {
        let data = {};
        data.fname = getFromLocale('fname');
        data.lname = getFromLocale('lname');
        data.date = getFromLocale('date');
        data.email = getFromLocale('email');
        data.country = getFromLocale('country');

        data.address = getFromLocale('address-1')+
            document.getElementById('address-2').value;

        data.mark = document.getElementById("mark").value;
        data.gender = isGenderCorrect();
        data.courses = isCoursesCorrect();

        if(!data.gender || !data.courses){
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

    //Clean text input
    form.addEventListener("click", function(e){
        //if a clean-button is pressed
        //clears the input element in front of the button
        if(e.target.getAttribute("data-action")==="clean"){
            let text_field = e.target.previousElementSibling;
            if(text_field.tagName==="INPUT" || text_field.tagName==="TEXTAREA"){
                text_field.value='';
                deleteKeyFromLocale(text_field.name);
            }
        }
    });

    /*Sending form*/
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

    /*Event binding*/
    document.addEventListener("DOMContentLoaded", ready);
    form.addEventListener('submit', submitForm);

    let backButton = document.getElementById("back");
    backButton.addEventListener('click', goBack);

    document.querySelector(".btn-reset").addEventListener('click', (e)=>{
        localStorage.clear();

        setToLocale(STATUS,"progress");
    });


})();


