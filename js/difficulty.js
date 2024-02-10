const playBtn = document.getElementById("buttonPlay");
const levels = document.getElementById("levels");
const nickname = document.getElementById("nicknameInput");

let arrayBoxes = [];
//Función con la que se crearán los div de almacenamiento del color escogido con su input de elección (dependiendo de la cantidad de colores a elegir según dificultad de juego)
function createBoxSelection(boxes){
    let containerColors = document.getElementById("containerColors");
    containerColors.textContent = null;
    for(let i = 0; i < boxes; i++){
        let boxSelection = document.createElement("div");
        boxSelection.className = "boxSelection";
        let box = document.createElement("div");
        box.id = `box${i}`;
        box.className = "box";
        let inputColor = document.createElement("input");
        inputColor.type = "color";
        inputColor.id=`colorSelected${i}`;
        inputColor.name = i;
        boxSelection.appendChild(box);
        boxSelection.appendChild(inputColor);
        containerColors.appendChild(boxSelection);
    }
}
//Función para guardar la elección de colores escogida. Y servirá para controlar el desarrollo adecuado del juego siguiendo las normas de colores del mismo.
function keepColorSessionStorage(colors){
    for(let i = 0; i < colors;i++){
        const box = document.getElementById(`box${i}`);
        const colorSelected = document.getElementById(`colorSelected${i}`);
        colorSelected.addEventListener("change", ()=>{
            if (arrayBoxes.includes(colorSelected.value)){
                alert("This color has been used")
                return
            }else if (colorSelected.value === "#ffffff"){
                alert("White color can't be used")
                return
            }else{
                box.style.backgroundColor = colorSelected.value;
                arrayBoxes[colorSelected.name] = colorSelected.value;
            }
        })
    }
}
//Al dar click en cualquier nivel se crean y guardan los diferentes inputs y colores
//Con sessionStorage guardaremos el dato de intentos para podes llevarlo por los siguientes sitios de la web
levels.addEventListener("click", (event)=>{
    const boxColors = document.getElementById("boxCol");
    boxColors.style.display="flex";
    switch(event.target.outerText){
        case "Beginner":
            sessionStorage.setItem("tried",10);
            createBoxSelection(4);
            keepColorSessionStorage(4);
            break;
        case "Intermediate":
            sessionStorage.setItem("tried",8);
            createBoxSelection(5);
            keepColorSessionStorage(5);
            break;
        case "Advanced":
            sessionStorage.setItem("tried",6);
            createBoxSelection(6);
            keepColorSessionStorage(6);
            break;
        default:
            break;
    }
});

//Con el botón play comprobaremos datos para poder seguit avanzando al tablero de juego guardando en sessionStorage el nick y el array de colores escogido
playBtn.addEventListener("click", ()=>{
    const nick = nickname.value == null || nickname.value == "";
    let boxesWait = 0;
    switch(sessionStorage.getItem("tried")){
        case "10":
            boxesWait = 4;
            break;
        case "8":
            boxesWait = 5;
            break;
        case "6":
            boxesWait = 6;
            break;
        default:
            boxesWait = 4;
            break;
    }
    const colorsAsigned = allColors(arrayBoxes, boxesWait);
    if(nick){
        alert("Choose a nickname please")
        return;
    }else if(colorsAsigned){
        alert("All boxes must contain color, white is not allowed")
        return
    }else{
        sessionStorage.setItem("nickName",nickname.value);
        sessionStorage.setItem("colorsPlay",arrayBoxes);
        window.location.href="../pages/game.html"
    }
})
//función para controlar que funciona el guardado de colores correctamente
function allColors(arrayBoxColors, boxesWait){
    let errors = 0;
    for(let i = 0; i < arrayBoxColors.length;i++){
        if(arrayBoxColors[i] == null || arrayBoxColors[i] == ""){
            errors ++;
        }
    }
    if(errors > 0 || arrayBoxColors.length !== boxesWait){
        return true;
    }else{
        return false;
    }
}