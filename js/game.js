
//variables recogiendo datos desde el SessionStorage
let nickName = sessionStorage.getItem("nickName");
let sessionColor = sessionStorage.getItem("colorsPlay");
let attempts = sessionStorage.getItem("tried");

//Transforma el string de los colores elegidos a un array
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

let playerCombination = [];
for (let i = 0; i < boxColorsSelected.length; i++) {
    combinationToWin.push(boxColorsSelected[Math.floor(Math.random() * boxColorsSelected.length)]);
};

//Nada más cargar la página de juego dibujar los div de añadir el usuario los colores escogidos previamente y el resultado del check de comprobación/comparación. Y un div donde aparecerán los colores escogidos anteriormente
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < boxColorsSelected.length; i++) {
        let boxColor = document.createElement("div");
        boxColor.className = "buttonColorSelected";
        boxColor.style.backgroundColor = `${boxColorsSelected[i]}`;
        colorsSelected.appendChild(boxColor);
    }

    for (let i = 0; i < parseInt(attempts); i++) {
        let boxAttempt = document.createElement("div");
        boxAttempt.id = `attempt${i}`;
        boxAttempt.className = "boxesAttempts";
        colorsAttempts.appendChild(boxAttempt);
        for (let i = 0; i < boxColorsSelected.length; i++) {
            let boxColorAttempts = document.createElement("div");
            boxColorAttempts.id = `colorBoxes${i}`;
            boxColorAttempts.className = "ColorsAttemptBox";
            boxAttempt.appendChild(boxColorAttempts);
        }
        for (let i = 0; i < boxColorsSelected.length; i++) {
            let boxColorComprobation = document.createElement("div");
            boxColorComprobation.id = `colorComprobation${i}`;
            boxColorComprobation.className = "ColorsAttemptComprobation";
            boxAttempt.appendChild(boxColorComprobation);
        }
    }
})
let actualAttemptId = 0;
let actualNumColor = 0;
//Función para la hora de hacer click en uno de los colores vaya pintando sobre la linea de intento de parte del usuario
colorsSelected.addEventListener("click", (e) => {
    let actualAttempt = document.getElementById(`attempt${actualAttemptId}`);
    let actualSelectedColor = actualAttempt.querySelector(`#colorBoxes${actualNumColor}`);
    if ((actualNumColor < boxColorsSelected.length) && (actualSelectedColor.style.backgroundColor === "")) {
        actualSelectedColor.style.backgroundColor = e.target.style.backgroundColor;
        actualNumColor++;
        if (actualNumColor === boxColorsSelected.length) {
            checkBtn.removeAttribute("disabled")
        }
    }
})
//Función para la hora de hacer click borre el valor último añadido y así uno tras otro de la misma línea de intento
deletedBtn.addEventListener("click", () => {
    let actualAttempt = document.getElementById(`attempt${actualAttemptId}`);
    let actualSelectedColor = actualAttempt.querySelector(`#colorBoxes${actualNumColor - 1}`);
    if (actualNumColor > 0) {
        actualSelectedColor.style.backgroundColor = "";
        actualNumColor--;
        if (actualNumColor != boxColorsSelected.length) {
            checkBtn.setAttribute("disabled", "true");
        }
    }
});
//Funcón para compara los dos arrays de colores (user y random)
const combinationsEquals = (user, random) => {
    for (let i = 0; i < user.length; i++) {
        if (user[i] !== random[i]) {
            return false;
        }
    }
    return true;
}
//Función para la comprobación de la igualdad de los arrays 
checkBtn.addEventListener("click", () => {
    let actualAttempt = document.getElementById(`attempt${actualAttemptId}`);

    for (let i = 0; i < boxColorsSelected.length; i++) {
        let actualSelectedColor = actualAttempt.querySelector(`#colorBoxes${i}`);
        playerCombination.push(rgbToHex(actualSelectedColor.style.backgroundColor));
    }
    console.log(playerCombination);
    console.log(combinationToWin);
    if (combinationsEquals(playerCombination, combinationToWin)) {
        window.location.href="../pages/win.html";
    } else if (actualAttemptId + 1 === parseInt(attempts)) {
        window.location.href="../pages/lose.html";
    } else {
        let comprobationActualColor;
        for (let i = 0; i < playerCombination.length; i++) {
            comprobationActualColor = actualAttempt.querySelector(`#colorComprobation${i}`);
            if (playerCombination[i] === combinationToWin[i]) {
                comprobationActualColor.style.backgroundColor = "#A200FF";
            } else {
                for (let j = 0; j < combinationToWin.length; j++) {
                    if (j != i) {
                        if (playerCombination[j] === combinationToWin[i]) {
                            comprobationActualColor = actualAttempt.querySelector(`#colorComprobation${j}`);
                            if (comprobationActualColor.style.backgroundColor !== "#A200FF") {
                                comprobationActualColor = actualAttempt.querySelector(`#colorComprobation${j}`);
                                comprobationActualColor.style.backgroundColor = "#FFFFFF"
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    actualNumColor = 0;
    actualAttemptId++;
    playerCombination = []
    checkBtn.setAttribute("disabled", "true");

})





