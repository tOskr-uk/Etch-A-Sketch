'use strict';

const grid = document.querySelector('.grid');
const gridToggle = document.getElementById('grid-check');
const randomColorToggle = document.getElementById('color-randomize');
const gridLabel = document.getElementById('grid-label');
const randomColorLabel = document.getElementById('color-randomize-label');
const colorPicker = document.querySelector('.color-picker');

let penColor = '#000000';
let gridStatus = false;
let randomColorStatus = false;

const colorArr = ['black', 'blueviolet', 'blue', 'brown', 'cadetblue', 'coral', 'darkcyan', 'darkgreen', 'orchid', 'olivedrab', 'palegreen', 'red', 'royalblue', 'yellow', 'wheat', 'yellowgreen']

createGrid(40);
createColorPicker();
setPenColor(0);


// triggers for random color toggle
randomColorToggle.addEventListener('change', ()=>{
    randomColorLabel.classList.toggle('btn--pushed');
    if(randomColorLabel.classList.contains('btn--pushed')){
        randomColorStatus = true;
    } else {
        randomColorStatus = false;
    }
})


// trigger for changing grid size.
const gridSize = document.getElementById('grid-size');
gridSize.addEventListener('change', ()=>{
    let val = gridSize.value;
    const maxGrid = 100;
    if(val > maxGrid) val = maxGrid;

    deleteGridElements();
    createGrid(parseInt(val));

    if(gridStatus){
        toggleGridBorder(true);
    }

    // update grid label
    const span = document.querySelector('.tools__group span');
    span.innerText = `${val} x ${val}`;
})



// -------------
// COLOR PICKER
// -------------
// trigger for color selection
colorPicker.addEventListener('click', e=>{
    const id = e.target.id.slice(4);
    setPenColor(id);
})

// formats the active color element and sets the global penColor variable
function setPenColor(id){
    const ac = document.querySelector('.active-color');
    const color = colorArr[id];
    ac.innerText = color;
    ac.style.backgroundColor = color;
    penColor = color;

    // changes text color where color is too dark to see it.
    // Can be done programaticaly using hsl values. Added to todo list.
    const darkArr = [0,1,2,3,6,7,9,12];
    if(darkArr.includes(parseInt(id))){
        ac.style.color = 'white';
    } else {
        ac.style.color = 'black';
    }
}

// creates and assigns colors to the colorpicker grid
function createColorPicker(){
    for(let i=0;i<colorArr.length;i++){
        const div = document.createElement('div');
        div.setAttribute('id', `cpe-${i}`);
        div.style.backgroundColor = colorArr[i];
        colorPicker.appendChild(div);
    }
}




// ---------------
// GRID FUNCTIONS
// ---------------
grid.addEventListener('mousedown',e=>{
    e.preventDefault();
    paintCell(e.target);
    if(e.buttons === 1){
        grid.addEventListener('mouseover',e=>{
            e.preventDefault();
            e.buttons == 1 ? paintCell(e.target) : false;
        })
    }
})

// paints the cell
function paintCell(cell){
    if(cell.classList.contains('grid__cell')){
        if(randomColorStatus){
            setPenColor(Math.floor(Math.random()*colorArr.length));
        }
        cell.style.backgroundColor = penColor;
    }
}

// creates the grid in the DOM.
function createGrid(size){
    const gridWidth = grid.offsetWidth;
    const cellSize = gridWidth/size;

    for(let i=0;i<size*size;i++){
        const div = document.createElement('div');
        div.classList.add('grid__cell');
        div.style.width = `${cellSize}px`
        div.style.height = `${cellSize}px`
        grid.appendChild(div);
    }
}

// clears the grid.
function clearCanvas(){
    const cells = document.querySelectorAll('.grid__cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
}

// triggers for border toggle
gridToggle.addEventListener('change', ()=>{
    gridLabel.classList.toggle('btn--pushed');
    if(gridLabel.classList.contains('btn--pushed')){
        toggleGridBorder(true);
    } else {
        toggleGridBorder(false);
    }
})

// toggles the grid border on/off
function toggleGridBorder(state){
    const cells = document.querySelectorAll('.grid__cell');
    cells.forEach(cell => {
        if(state){
            cell.style.border = '1px solid #eee';
            gridStatus = true;
        } else {
            cell.style.border = 'none';
            gridStatus = false;
        }
    });
}

// deletes al the grid cells
function deleteGridElements(){
    while(grid.lastElementChild){
        grid.removeChild(grid.lastChild);
    }
}