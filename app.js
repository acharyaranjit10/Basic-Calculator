const screen = document.querySelector("#screen");
let keys = document.querySelectorAll(".key");
let nums = document.querySelectorAll(".nums");
let operators = document.querySelectorAll(".operators");
let clr = document.querySelector(".clr");
let del = document.querySelector(".del");
let operVisibility = document.querySelector(".oper");
let prevInput = "";
let currentInput = "";
let operator = null;
let temp = "";

keys.forEach((key) => {
    key.addEventListener("click", () => {
        const keyVal = key.getAttribute("data-value");
        const action = key.getAttribute("data-action");
        const symbol = key.getAttribute("symbol");
        

        if (key.classList.contains("nums")) {
            handleNumber(keyVal);
        } else if (key.classList.contains("operators")) {
            handleOperator(symbol);
        } else if (action === "clear") {
            clearScreen();
        } else if (action === "deleteLast") {
            deleteLast();
        } else if (action === "calculate") {
            calculate();
        } else if (action === "decimal") {
            addDecimal();
        }
    });
});


function clearScreen(){
screen.innerText="";
prevInput = "";
currentInput = "";
operator = null;
temp = "";
}


function deleteLast(){
if(screen.innerText.length>1){
    screen.innerText=(screen.innerText).slice(0,-1);
    temp=screen.innerText;
}
else{
    screen.innerText="";
    temp="";
}
}

function addDecimal(){
    if(!temp.includes(".")){
        screen.innerText+=".";
        temp+=".";
    }
}




const handleNumber=(number)=>{
if(screen.innerText=="00" || temp=="" ||screen.innerText=="0"){
screen.innerText=number;
temp=number;
}
else{
    screen.innerText+=number;
    temp+=number;
}

};


const handleOperator=(op)=>{
    if (prevInput && temp && operator) {
        calculate();
    }
    operator=op;
    prevInput=temp;
    
    temp="";
    screen.innerText="";
    
};

function calculate(){
    
    if(prevInput && temp && operator){
        let expression = prevInput + operator + temp;
        let result = eval(expression);
        screen.innerText=result;

        prevInput = screen.innerText;
        temp = screen.innerText;
        operator = "";
    }
}