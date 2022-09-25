'use strict';

const grid = document.querySelector('.grid');

createGrid(64);

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
