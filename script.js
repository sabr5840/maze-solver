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
        const response = await fetch("maze.json");

        if (!response.ok) {
            throw new Error("Error: There was a problem fetching maze data.");
        }

        const data = await response.json();

        if (!data || typeof data !== "object") {
            throw new Error("Error: Maze data was not loaded correctly.");
        }

        // Check for required fields in JSON data
        const requiredFields = ["rows", "cols", "start", "goal", "maze"];
        for (const field of requiredFields) {
            if (!(field in data)) {
                throw new Error(`Error: JSON data is missing the field '${field}'.`);
            }
        }

        // Check for correct value types for start and goal fields
        const { start, goal } = data;
        if (
            typeof start !== "object" ||
            typeof start.row !== "number" ||
            typeof start.col !== "number" ||
            typeof goal !== "object" ||
            typeof goal.row !== "number" ||
            typeof goal.col !== "number"
        ) {
            throw new Error("Error: Start or goal position is not properly defined in maze data.");
        }

        // Save the loaded maze data in the global model variable
        model = data;
    } catch (error) {
        console.error(error.message);
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
        showRoute(); // show coute, when true
        console.log('Route:', route); // Prints out the route in the console
        return;
    }

    let neighbours = getUnvisitedAvailableNeighbours(cell);

    if (neighbours.length === 0) {
        showVisitedCell(cell, true); // Mark as dead-end if no available neighbours
    }

    while(!goalReached && neighbours.length>0){
        visitCell(neighbours[0]);

        neighbours = getUnvisitedAvailableNeighbours(cell);
    }

    if(!goalReached) {
        route.pop();
    }
}


let goalReached = false; // Initialize goalReached variable

function depthFirstSearch(row, col) {
    if (row < 0 || col < 0 || row >= model.rows || col >= model.cols) {
        return false; // Ugyldig celle, vend tilbage
    }

    const currentCell = model.maze[row][col];
    visitCell(currentCell); // Besøg den aktuelle celle

    if (row === model.goal.row && col === model.goal.col) {
        console.log('Goal reached!');
        showRoute(); // Vis ruten, når målet er nået
        console.log('Route:', route); // Udskriv ruten i konsollen
        return true; // Målet er nået, vend tilbage
    }

    if (!currentCell.visited) {
        currentCell.visited = true; // Markér den aktuelle celle som besøgt

        // Rekursivt søg i alle retninger
        if (!currentCell.north && depthFirstSearch(row - 1, col)) {
            return true;
        }
        if (!currentCell.east && depthFirstSearch(row, col + 1)) {
            return true;
        }
        if (!currentCell.south && depthFirstSearch(row + 1, col)) {
            return true;
        }
        if (!currentCell.west && depthFirstSearch(row, col - 1)) {
            return true;
        }
    }

    // Ingen vej til målet fra denne celle, vend tilbage
    return false;
}


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

function showVisitedCell(cell, isDeadEnd) {
    const visualCells = document.querySelectorAll("#grid .cell");
    const visualCellIndex = cell.row * model.cols + cell.col;
    const visualCell = visualCells[visualCellIndex];
    visualCell.classList.add("visited");

    if (isDeadEnd) {
        visualCell.classList.add("dead-end");
    }
}


function showRoute() {
    const visualCells = document.querySelectorAll("#grid .cell");

    for (const cell of route) {
        const visualCellIndex = cell.row * model.cols + cell.col;
        const visualCell = visualCells[visualCellIndex];
        visualCell.classList.add("route");
    }
}