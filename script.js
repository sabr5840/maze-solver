"use strict";

let model; // Deklarerer model som en global variabel
let route = []; // Define route array

window.addEventListener("load", start);

async function start() {
    console.log("Maze is running");
    await readModelFromJson();

    createGrid();
    showMaze();

    visitCell(model.maze[0][0])
   
    showRoute(); 
}

async function readModelFromJson() {
    try {
        const data = await fetch("maze.json");
        model = await data.json();
    } catch (error) {
        console.error("Error loading maze data:", error);
    }
}

function showMaze() {
    const visualCells = document.querySelectorAll("#grid .cell");
    for (let row = 0; row < model.rows; row++) {
        for (let col = 0; col < model.cols; col++) {
            const cell = model.maze[row][col];
            const visualCellIndex = row * model.cols + col;
            const visualCell = visualCells[visualCellIndex];

            if (cell.north) {
                visualCell.classList.add("north");
            }

            if (cell.south) {
                visualCell.classList.add("south");
            }

            if (cell.east) {
                visualCell.classList.add("east");
            }

            if (cell.west) {
                visualCell.classList.add("west");
            }
        }
    }
    showGoal();
    showStart();
}

function createGrid() {
    const grid = document.querySelector("#grid");
    grid.style.setProperty("--GRID-WIDTH", model.cols);

    for (let row = 0; row < model.rows; row++) {
        for (let col = 0; col < model.cols; col++) {
            const visualCell = document.createElement("div");
            visualCell.classList.add("cell");
            grid.append(visualCell);
        }
    }
}

function visitCell(cell) {
    cell.visited = true;
    route.push(cell);

    showVisitedCell(cell);

    if (cell.row === model.goal.row && 
        cell.col === model.goal.col) {
        console.log('Goal reached!');
        goalReached = true;
        return;
    }

    let neighbours = getUnvisitedAvailableNeighbours(cell);

    while(!goalReached && neighbours.length>0){
        visitCell(neighbours[0]);

        neighbours = getUnvisitedAvailableNeighbours(cell);
    }


    if(!goalReached) {
        route.pop();
    }
}

let goalReached = false; // Initialize goalReached variable


function getUnvisitedAvailableNeighbours(cell) {
    let neighbours = [];

    if (cell.row < model.rows - 1 && !cell.south) {
        if (!model.maze[cell.row+1][cell.col].visited)
            neighbours.push(model.maze[cell.row+1][cell.col]);
    }

    if (cell.col < model.cols - 1 && !cell.east) {
        if (!model.maze[cell.row][cell.col+1].visited)
            neighbours.push(model.maze[cell.row][cell.col+1]);
    }

    if (cell.row > 0 && !cell.north) { 
        if (!model.maze[cell.row-1][cell.col].visited)
            neighbours.push(model.maze[cell.row-1][cell.col]);
    }

    if (cell.col > 0 && !cell.west) { 
        if (!model.maze[cell.row][cell.col-1].visited)
            neighbours.push(model.maze[cell.row][cell.col-1]);
    }

    return neighbours;
}


function showStart() {
    const visualCells = document.querySelectorAll("#grid .cell");
    const visualCellIndex = model.start.row * model.cols + model.start.col;
    const visualCell = visualCells[visualCellIndex];
    visualCell.classList.add("start");
}

function showGoal() {
    const visualCells = document.querySelectorAll("#grid .cell");
    const visualCellIndex = model.goal.row * model.cols + model.goal.col;
    const visualCell = visualCells[visualCellIndex];
    visualCell.classList.add("goal");
}

function showVisitedCell(cell) {
    const visualCells = document.querySelectorAll("#grid .cell");
    const visualCellIndex = cell.row * model.cols + cell.col;
    const visualCell = visualCells[visualCellIndex];
    visualCell.classList.add("visited");
}

function showRoute() {
    const visualCells = document.querySelectorAll("#grid .cell");

    for (const cell of route) {
        const visualCellIndex = cell.row * model.cols + cell.col;
        const visualCell = visualCells[visualCellIndex];
        visualCell.classList.add("route");
    }
}
