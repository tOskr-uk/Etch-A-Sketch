'use strict';

const grid = document.querySelector('.grid');
const colorPicker = document.querySelector('.color-picker input');
let PenColor = '#000';

createGrid(16);


colorPicker.addEventListener('change', ()=>{
    PenColor = colorPicker.value;
    colorPicker.nextElementSibling.style.backgroundColor = PenColor;
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
        cell.style.backgroundColor = 'red';
    }
}

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

function clearCanvas(){
    const cells = document.querySelectorAll('.grid__cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
}

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

const gridToggle = document.getElementById('grid-check');
const gridLabel = document.getElementById('grid-label');
gridToggle.addEventListener('change', ()=>{
    gridLabel.classList.toggle('btn--pushed');
    if(gridLabel.classList.contains('btn--pushed')){
        toggleGridBorder(true);
    } else {
        toggleGridBorder(false);
    }
})


