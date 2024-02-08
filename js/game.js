let nickName = sessionStorage.getItem("nickName");
let sessionColor = sessionStorage.getItem("colorsPlay");
let attempts = sessionStorage.getItem("tried");


let boxColorsSelected = sessionColor.split(',');

let colorsSelected = document.getElementById("colors");
let colorsAttempts = document.getElementById("masterMind");
let deletedBtn = document.getElementById("buttonDeleted");
let checkBtn = document.getElementById("buttonCheck")

//Funcion para convertir de rgb a Hex
function rgbToHex(rgb) {
    let rgbValues = rgb.match(/\d+/g);
    let colorsHex = "#";
    for (let i = 0; i < 3; i++) {
      let valueHex = parseInt(rgbValues[i]).toString(16);
      colorsHex += valueHex.length === 1 ? "0" + valueHex : valueHex;
    }
    return colorsHex;
}

//Combinación aleatoria desde la gama de colores elegida
let combinationToWin = [];

let playerCombination=[];
for(let i = 0; i< boxColorsSelected.length;i++){
    combinationToWin.push(boxColorsSelected[Math.floor(Math.random()*boxColorsSelected.length)]);
};

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
let actualAttemptId= 0;
let actualNumColor = 0;

colorsSelected.addEventListener("click",(e)=>{
    let actualAttempt = document.getElementById(`attempt${actualAttemptId}`);
    let actualSelectedColor = actualAttempt.querySelector(`#colorBoxes${actualNumColor}`);
    if((actualNumColor < boxColorsSelected.length)&& (actualSelectedColor.style.backgroundColor === "")){
            actualSelectedColor.style.backgroundColor = e.target.style.backgroundColor;
            actualNumColor++;
        if(actualNumColor === boxColorsSelected.length){
            checkBtn.removeAttribute("disabled")
        }
    }
})

deletedBtn.addEventListener("click",()=>{
    let actualAttempt = document.getElementById(`attempt${actualAttemptId}`);
    let actualSelectedColor = actualAttempt.querySelector(`#colorBoxes${actualNumColor-1}`);
    if(actualNumColor>0){
        actualSelectedColor.style.backgroundColor = "";
        actualNumColor--;
        if(actualNumColor != boxColorsSelected.length){
            checkBtn.setAttribute("disabled","true");
        }
    }
});
const combinationsEquals = (user,random) =>{
    for (let i = 0; i < user.length; i++) {
        if (user[i] !== random[i]) {
            playerCombination = []
            return false;
        }
    }
    return true;
}

checkBtn.addEventListener("click", ()=>{
    let actualAttempt = document.getElementById(`attempt${actualAttemptId}`);
    for(let i = 0; i< boxColorsSelected.length ; i++){
        let actualSelectedColor = actualAttempt.querySelector(`#colorBoxes${i}`);
        playerCombination.push(rgbToHex(actualSelectedColor.style.backgroundColor));
    }
    console.log(playerCombination);
    console.log(combinationToWin);
    if(combinationsEquals(playerCombination,combinationToWin)){
        alert("acierto")
    }else if (actualAttemptId+1===parseInt(attempts)){
        alert("fallo")
    }else{
        let actualSelectedColor;
        let comprobationActualColor;
        for(let i = 0;i<boxColorsSelected.length;i++){
            actualSelectedColor = actualAttempt.querySelector(`#colorBoxes${i}`);
            comprobationActualColor = actualAttempt.querySelector(`#colorComprobation${i}`);
            
            if(rgbToHex(actualSelectedColor.style.backgroundColor)===combinationToWin[i]){
                comprobationActualColor.style.backgroundColor = "#A200FF";
            }else if(combinationToWin.includes(rgbToHex(actualSelectedColor.style.backgroundColor))){
                comprobationActualColor.style.backgroundColor = "#FFFFFF";
            }
            
        }
    }
    actualNumColor=0;
    actualAttemptId++;
    checkBtn.setAttribute("disabled","true");
})





