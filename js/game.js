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
//console.log(boxColorsSelected); //[color1,color2,color3,color4,.....] 
let colorsSelected = document.getElementById("colors");
document.addEventListener("DOMContentLoaded", ()=>{
    for(let i = 0;i<boxColorsSelected.length;i++){
        let boxColor = document.createElement("div");
        boxColor.id = `color${i}`;
        boxColor.className = "buttonColorSelected";
        boxColor.style.backgroundColor=`${boxColorsSelected[i]}`;
        colorsSelected.appendChild(boxColor);
    }
})




