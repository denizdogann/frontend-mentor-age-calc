const dayBox = document.getElementById("day");
const monthBox = document.getElementById("month");
const yearBox = document.getElementById("year"); 
const errorSpans = document.getElementsByClassName("error-text");
const labels = document.getElementsByTagName("label");
const now = Date.now();

$("#sub").on("click", ()=>{
    clearErrors()
    let day = Number(dayBox.value);
    let month = Number(monthBox.value);
    let year = Number(yearBox.value);

    let tarih = Date.parse(`${year}-${month}-${day}`);

    if(isNaN(tarih)){
        invalidDateError()
    }

    else if(now - tarih < 0){
        pastTimeError()
    }
    else{
        
        Calculate(tarih);
    }


});


$(".input").on("input", function(){
    let day = Number(dayBox.value);
    let month = Number(monthBox.value);
    let year = Number(yearBox.value);

    if(isNaN(day) || isNaN(month) || isNaN(year)){
        $(this).val("");
    }

});

function invalidDateError(){
    document.getElementById("day-error").innerHTML = "Must be a valid day."
    document.getElementById("month-error").innerHTML = "Must be a valid month."
    document.getElementById("year-error").innerHTML = "Must be in the past."


    for(let label of labels){
        label.style.color = "var(--light-red)";
    }
    $(".input").css({"border":"1px solid var(--light-red)"});

    document.getElementById("result-year").innerHTML = "--";
    document.getElementById("result-month").innerHTML = "--";
    document.getElementById("result-day").innerHTML = "--";

}

function pastTimeError(){
    document.getElementById("day-error").innerHTML = "Must be in the past."
    document.getElementById("month-error").innerHTML = "Must be in the past."
    document.getElementById("year-error").innerHTML = "Must be in the past."

    
    for(let label of labels){
        label.style.color = "var(--light-red)";
    }
    $(".input").css({"border":"1px solid var(--light-red)"});
    document.getElementById("result-year").innerHTML = "--";
    document.getElementById("result-month").innerHTML = "--";
    document.getElementById("result-day").innerHTML = "--";
}

function Calculate(tarih){
    const resultEpoch = now-tarih;
    const totaldays = Math.floor((resultEpoch/1000)/86400);
    const resultYears = Math.floor(totaldays / 365);
    const resultMonths = Math.floor((totaldays % 365) / 30);
    const resultDays = Math.floor((totaldays % 365) % 30);

    document.getElementById("result-year").innerHTML = resultYears;
    document.getElementById("result-month").innerHTML = resultMonths;
    document.getElementById("result-day").innerHTML = resultDays;


}

function clearErrors(){
    document.getElementById("day-error").innerHTML = ""
    document.getElementById("month-error").innerHTML = ""
    document.getElementById("year-error").innerHTML = ""

    for(let label of labels){
        label.style.color = "var(--smokey-grey)";
    }
    $(".input").css({"border":"1px solid var(--light-grey)"});
}