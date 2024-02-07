let nickName = localStorage.getItem("nickName");
let localColor = localStorage.getItem("colorsPlay");
let attempts = localStorage.getItem("tried");
/*
console.log(nickName);
console.log(localColor);
console.log(attempts);
*/
//console.log(typeof localColor); //string
let boxColorsSelected = localColor.split(',');
//console.log(typeof parseInt(attempts)); //number
//console.log(boxColorsSelected); //[color1,color2,color3,color4,.....] 
let colorsSelected = document.getElementById("colors");
let colorsAttempts = document.getElementById("masterMind");

document.addEventListener("DOMContentLoaded", ()=>{
    for(let i = 0;i<boxColorsSelected.length;i++){
        let boxColor = document.createElement("div");
        boxColor.id = `color${i}`;
        boxColor.className = "buttonColorSelected";
        boxColor.style.backgroundColor=`${boxColorsSelected[i]}`;
        colorsSelected.appendChild(boxColor);
    }
    
    for(let i = 0; i<parseInt(attempts);i++){
        let boxAttempt = document.createElement("div");
        boxAttempt.id = `attempt${i}`;
        boxAttempt.className = "boxesAttempts";
        //let attempt = document.createElement("span");
        //let numberAttempt = document.createTextNode(`${i+1}.`);
        //attempt.appendChild(numberAttempt);
        //boxAttempt.appendChild(attempt);
        colorsAttempts.appendChild(boxAttempt);
        for(let i = 0;i<boxColorsSelected.length;i++){
            let boxColorAttempts = document.createElement("div");
            boxColorAttempts.id=`colorBoxes${i}`;
            boxColorAttempts.className = "ColorsAttemptBox";
            boxAttempt.appendChild(boxColorAttempts);
        }
        for(let i = 0;i<boxColorsSelected.length;i++){
            let boxColorComprobation = document.createElement("div");
            boxColorComprobation.id=`colorComprobation${i}`;
            boxColorComprobation.className = "ColorsAttemptComprobation";
            boxAttempt.appendChild(boxColorComprobation);
        }
    }
})

let actualAttemptId = 0;
let actualNumColor = 0;
let colorBtn = document.getElementsByClassName("buttonColorSelected")
colorsSelected.addEventListener("click",(e)=>{
    //console.log(e.target.style.backgroundColor); //rgb(193, 21, 21)
    let actualAttempt = document.getElementById(`attempt${actualAttemptId}`);
    let actualSelectedColor = document.getElementById(`colorBoxes${actualNumColor}`)
    if((actualNumColor < boxColorsSelected.length)&& (actualSelectedColor.style.backgroundColor === "")){
        actualSelectedColor.style.backgroundColor = e.target.style.backgroundColor;
        actualNumColor++;
        if(actualNumColor === boxColorsSelected.length){
            console.log("yaaaa no puedes mas");
        }
    }
})




