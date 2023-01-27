// Defining the constants
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

///
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;


function setCurrentColor(newColor){
    currentColor = newColor
}

function setCurrentMode(newMode){
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize){
    currentSize = newSize
}

//  Getting all the variables from the html

const colorPicker = document.getElementsByClassName('color-selector');
const colorModeBtn = document.querySelector('.color-mode');
const rainbowModeBtn = document.querySelector('.rainbow-mode');
const eraserBtn = document.querySelector('.btn.eraser');
const clearBtn = document.querySelector('.clear');

const drawArea = document.getElementById('draw-area');

// Setting up variables

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorModeBtn.onclick = ()=> setCurrentMode('color')
rainbowModeBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')

clearBtn.onclick = () => reloadGrid()

// making sure mouse has been pressed down in order to start drawing
let mouseDown = false
document.body.onmousedown = () =>(mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// creating code for each function

function reloadGrid(){
    clearGrid()
    setupGrid(currentSize)
}

function clearGrid(){
    drawArea.innerHTML = ""
}

function setupGrid(size){

    drawArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    drawArea.style.gridTemplateRows = `repeat(${size}, 1fr)`
    
    for (let i = 0; i < size * size; i++){
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
         gridElement.addEventListener('mousedown', changeColor)
        drawArea.appendChild(gridElement);
    }
}


function changeColor(e){
    if(e.type === 'mouseover' && !mouseDown)return
    if(currentMode === 'rainbow'){
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }else if (currentMode === 'color'){
        e.target.style.backgroundColor = currentColor;

    }else if (currentMode ===  'eraser'){
        e.target.style.backgroundColor = '#fefefe'
    }
}

function activateButton(newMode){

    if(currentMode === 'rainbow'){
        rainbowModeBtn.classList.remove('active')
    }else if (currentMode === 'color'){
        colorModeBtn.classList.remove('active')
    }else if (currentMode === 'eraser'){
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowModeBtn.classList.add('active')
      } else if (newMode === 'color') {
        colorModeBtn.classList.add('active')
      } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
      }
    

}

window.onload =() =>{
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}

console.log(drawArea)




