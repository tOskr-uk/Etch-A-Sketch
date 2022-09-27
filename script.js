'use strict';

const grid = document.querySelector('.grid');
const gridToggle = document.getElementById('grid-check');
const gridLabel = document.getElementById('grid-label');
const colorPicker = document.querySelector('.color-picker');
// const cells = document.querySelectorAll('.color-picker div');


let penColor = '#000000';
const colorArr = ['black', 'blueviolet', 'blue', 'brown', 'cadetblue', 'coral', 'darkcyan', 'darkgreen', 'orchid', 'olivedrab', 'palegreen', 'red', 'royalblue', 'yellow', 'wheat', 'yellowgreen']

createGrid(16);
createColorPicker();
changePenColor(0);

// creates and assigns colors to the colorpicker grid
function createColorPicker(){
    for(let i=0;i<colorArr.length;i++){
        const div = document.createElement('div');
        div.setAttribute('id', `cpe-${i}`);
        div.style.backgroundColor = colorArr[i];
        colorPicker.appendChild(div);
    }
}

function changePenColor(id){
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

colorPicker.addEventListener('click', e=>{
    const id = e.target.id.slice(4);
    changePenColor(id);
})





grid.addEventListener('mousedown',e=>{
    paintCell(e.target);
    if(e.buttons === 1){
        grid.addEventListener('mouseover',e=>{
            e.buttons == 1 ? paintCell(e.target) : false;
        })
    }
})


function paintCell(cell){
    if(cell.classList.contains('grid__cell')){
        cell.style.backgroundColor = penColor;
    }
}

// crates the grid in the DOM.
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

// toggles the grid border on/off
gridToggle.addEventListener('change', ()=>{
    gridLabel.classList.toggle('btn--pushed');
    if(gridLabel.classList.contains('btn--pushed')){
        toggleGridBorder(true);
    } else {
        toggleGridBorder(false);
    }
})

function toggleGridBorder(state){
    const cells = document.querySelectorAll('.grid__cell');
    cells.forEach(cell => {
        if(state){
            cell.style.border = '1px solid #eee';
        } else {
            cell.style.border = 'none';
        }
    });
}





