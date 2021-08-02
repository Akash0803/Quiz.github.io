//select require element
const start = document.querySelector(".start_btn");
const startQ = document.querySelector("#btn1");
const info_box = document.querySelector(".info_box");
const exitQ = document.querySelector("#exit");
const continueQ = document.querySelector("#continue");
const quiz_box = document.querySelector(".quiz-box");
var option_list = document.querySelector("#option-list");
let timecount = document.querySelector(".timeleft");
//let timeLine = document.querySelector(".time_line");
const result = document.querySelector(".result-box");
let restart = document.querySelector(".restart");
let quit = document.querySelector(".quit");

//if start quiz button click
startQ.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

//if exit button click
exitQ.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

//if cintinue button click
continueQ.onclick = ()=>{
    start.style.display = "none";
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //display quiz box
    showQ(0);
    Qnumber (1);
    starttimer(30);
}

let Qcount = 0;
let Qnum = 1;
let counter;
let timevalue = 30;
let userScore = 0;

//if next button click

const next = document.querySelector(".next-btn");

next.onclick = ()=>{
    if(Qcount < quetions.length - 1){
        Qcount++;
        Qnum++;
        showQ(Qcount);
        Qnumber (Qnum);
        clearInterval(counter);
        starttimer(timevalue);
        next.style.display = "none";
    }else {
        console.log("Quiz is completed");
        showResult();
    }
}

//getting quetions and options from array.

function showQ(index){
    var quetion = document.querySelector(".quetion");
    var option_list = document.querySelector("#option-list");

    let que_tag = '<span>'+ quetions[index].numb + ". " + quetions[index].quetion +'</span>';
    
    let option_tag = '<div class="option">'+ quetions[index].options[0] +'<span></span></div>'
                    +'<div class="option">'+ quetions[index].options[1] +'<span></span></div>'
                    +'<div class="option">'+ quetions[index].options[2] +'<span></span></div>'
                    +'<div class="option">'+ quetions[index].options[3] +'<span></span></div>';
           
    quetion.innerHTML = que_tag;                
    option_list.innerHTML = option_tag;    

    const option = document.querySelectorAll(".option") ;
    for(let i=0; i<option.length; i++){
        option[i].setAttribute("onclick", "optionselected(this)");
    }
}

let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionselected(Ans){
    clearInterval(counter);
    let userAns = Ans.textContent;
    let correctAns = quetions[Qcount].answer;
    let alloptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        Ans.classList.add("correct");
        console.log("answer is correct");
        Ans.insertAdjacentHTML("beforeend", tickicon);
    }else {
        Ans.classList.add("incorrect");
        console.log("answer is incorrect");
        Ans.insertAdjacentHTML("beforeend", crossicon);

        //in selected answer is incorrect then automatically focus the correct ans

        for (let i = 0; i < alloptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
            }
            
        }
    }

    //once user selected any option disable all options
    for (let i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disable");
        }
        next.style.display = "block";
}

function showResult(){
    
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result.classList.add("activeResult"); //display result box

    const resultBox = document.querySelector(".result");
    if(userScore > 3){
        let reulttag = '<span>and congrats! You got <p>'+userScore+'</p>out of <p>'+quetions.length+'</p></span>';
        resultBox.innerHTML = reulttag;
    }
    else if(userScore > 1){
        let reulttag = '<span> You got <p>'+userScore+'</p>out of <p>'+quetions.length+'</p></span>';
        resultBox.innerHTML = reulttag;
    }
    else{
        let reulttag = '<span>And sorry, You got <p>'+userScore+'</p>out of <p>'+quetions.length+'</p></span>';
        resultBox.innerHTML = reulttag;
    }
}


function starttimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timecount.textContent = time;
        time--;
        if(time<9){
            let addzero = timecount.textContent;
            timecount.textContent = "0" + addzero;
        }
        if(time<0){
            clearInterval(counter);
            timecount.textContent = "00";
        }

    }
}

function Qnumber (index){
    const quenum = document.querySelector(".quetions-left");
    let quenum_tag = '<span><p>'+ index +'</p>of <p>'+ quetions.length +'</p>Questons</span>';
    quenum.innerHTML = quenum_tag;
}

//quit Quiz 

quit.onclick = ()=>{
    window.location.reload();
}

restart.onclick = ()=>{
    window.location.reload();
}

