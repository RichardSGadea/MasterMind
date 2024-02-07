let nickName = localStorage.getItem("nickName");
let localColor = localStorage.getItem("colorsPlay");
let attempts = localStorage.getItem("tried");


let boxColorsSelected = localColor.split(',');

let colorsSelected = document.getElementById("colors");
let colorsAttempts = document.getElementById("masterMind");
let deletedBtn = document.getElementById("buttonDeleted");
let checkBtn = document.getElementById("buttonCheck")


let combinationToWin = [];
for(let i = 0; i< boxColorsSelected.length;i++){
    combinationToWin.push(boxColorsSelected[Math.floor(Math.random()*boxColorsSelected.length)]);
};

console.log(combinationToWin);

document.addEventListener("DOMContentLoaded", ()=>{
    for(let i = 0;i<boxColorsSelected.length;i++){
        let boxColor = document.createElement("div");
        boxColor.className="buttonColorSelected";
        boxColor.style.backgroundColor=`${boxColorsSelected[i]}`;
        colorsSelected.appendChild(boxColor);
    }
    
    for(let i = 0; i<parseInt(attempts);i++){
        let boxAttempt = document.createElement("div");
        boxAttempt.id = `attempt${i}`;
        boxAttempt.className = "boxesAttempts";
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

let actualNumColor = 0;
let buttonsColorSelected = document.querySelectorAll("buttonColorSelected")
console.log(buttonsColorSelected);
colorsSelected.addEventListener("click",(e)=>{
    let actualSelectedColor = document.getElementById(`colorBoxes${actualNumColor}`);
    if((actualNumColor < boxColorsSelected.length)&& (actualSelectedColor.style.backgroundColor === "")){
            actualSelectedColor.style.backgroundColor = e.target.style.backgroundColor;
            actualNumColor++;
        if(actualNumColor === boxColorsSelected.length){
            checkBtn.removeAttribute("disabled")
        }
    }
})

deletedBtn.addEventListener("click",()=>{
    let actualSelectedColor = document.getElementById(`colorBoxes${actualNumColor-1}`);
    if(actualNumColor>0){
        actualSelectedColor.style.backgroundColor = "";
        actualNumColor--;
        if(actualNumColor != boxColorsSelected.length){
            checkBtn.setAttribute("disabled","true");
        }
    }
});





