elem = document.getElementById('lname');
elem.addEventListener("blur",
    (event)=>{
    console.log(event.target.value);
    window.localStorage.setItem('lname', event.target.value);
} );

let cleanInput = function(e){
    console.log(e.target.previousElementSibling)
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




