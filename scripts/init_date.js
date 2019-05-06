;
/*Initializing fields and setting event listeners*/
function init(){
    const MIN_AGE = 8;

    //Gets a list of countries from the server
    const getCountryList = () => {
        let countryList = document.getElementById("country-list");
        fetch('https://my-json-server.typicode.com/NastiaKyrakina/Angular-3/countries')
            .then(response => response.json())
            .then(data => {
                data.forEach(
                    country=>
                    {
                        let option = document.createElement("option");
                        option.innerText = country;
                        countryList.append(option);
                    }
                );
            }).
        catch(reject=>console.log(reject));
    };

    function setRangeValue(value){
        document.querySelector("output[for='mark']").innerText=value;
    }

        getCountryList();
    let inputFName = document.getElementById("fname");
    let inputLName = document.getElementById("lname");
    let inputDate = document.getElementById("date");
    let inputEmail = document.getElementById("email");
    let inputCountry = document.getElementById("country");
    let inputAdr1 = document.getElementById("address-1");
    let inputAdr2 = document.getElementById("address-2");
    let inputRange = document.getElementById("mark");
    let textAbout = document.getElementById("about");

    inputFName.addEventListener("keydown", delIncorrectSimvol);
    inputFName.addEventListener("blur", (e)=>textCorrect(e));

    inputLName.addEventListener("keydown", delIncorrectSimvol);
    inputLName.addEventListener("blur", (e)=>textCorrect(e));

    inputDate.setAttribute("max", getMaxDate(MIN_AGE));
    inputDate.addEventListener("blur",(e)=>{setToLocale(e.target.name, e.target.value)});

    inputRange.addEventListener("input", (e)=>setRangeValue(e.target.value));
    inputEmail.addEventListener("blur", (e)=>{setToLocale(e.target.name, e.target.value)});
    inputCountry.addEventListener("blur", (e)=>isCountryCorrect(e.target.value));
    inputAdr1.addEventListener("blur", (e)=>{setToLocale(e.target.name, e.target.value)});
    inputAdr2.addEventListener("blur", (e)=>{setToLocale(e.target.name, e.target.value)});

    textAbout.addEventListener("blur", (e)=>{setToLocale(e.target.name, e.target.value)});
}
