"use strict";

let model; // Deklarerer model som en global variabel

window.addEventListener("load", start);

async function start(){
    console.log("Maze is running");
    await readModelFromJson();
    createGrid();
    showMaze();
}

async function readModelFromJson(){
    try {
        const data = await fetch("maze.json");
        model = await data.json();
    } catch (error) {
        console.error("Error loading maze data:", error);
    }
}

function showMaze(){
    const visualCells = document.querySelectorAll("#grid .cell");
    for(let row = 0; row < model.rows; row++){
        for(let col = 0; col < model.cols; col++){
            const cell = model.maze[row][col];
            const visualCellIndex = row * model.cols + col;
            const visualCell = visualCells[visualCellIndex];

            if(cell.north){
                visualCell.classList.add("north");
            }

            if(cell.south){
                visualCell.classList.add("south");
            }

            if(cell.east){
                visualCell.classList.add("east");
            }

            if(cell.west){
                visualCell.classList.add("west");
            }
        }
    }
    showGoal();
    showStart();
}

function createGrid(){
    const grid = document.querySelector("#grid");
    grid.style.setProperty("--GRID-WIDTH", model.cols);


    for(let row = 0; row < model.rows; row++){
        for(let col = 0; col < model.cols; col++){
            const visualCell = document.createElement("div");
            visualCell.classList.add("cell");
            grid.append(visualCell);
        }
    }
}


function showStart(){
    const visitCells = document.querySelectorAll("#grid .cell");
    const visualCellIndex = model.start.row * model.cols + model.start.col;
    const visitCell = visitCells[visualCellIndex];
    visitCell.classList.add("start");
}

function showGoal(){
    const visitCells = document.querySelectorAll("#grid .cell");
    const visualCellIndex = model.goal.row * model.cols + model.goal.col;
    const visitCell = visitCells[visualCellIndex];
    visitCell.classList.add("goal");
}
