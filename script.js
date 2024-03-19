let route = []; // Stack to store the route
let data; // Store maze data globally

// Function to fetch maze data from JSON file
function fetchMazeData() {
    return fetch('maze.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            return jsonData;
        })
        .catch(error => console.error('Error fetching maze data:', error));
}

// Function to generate maze grid
function generateMazeGrid() {
    const mazeContainer = document.getElementById('maze-container');
    const mazeData = data.maze;

    mazeContainer.innerHTML = ''; // Clear existing maze

    mazeData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = document.createElement('div');
            div.className = 'cell';
            div.dataset.row = rowIndex;
            div.dataset.col = colIndex;
            if (cell.row === data.start.row && cell.col === data.start.col) {
                div.classList.add('start');
            } else if (cell.row === data.goal.row && cell.col === data.goal.col) {
                div.classList.add('goal');
            } else {
                if (cell.north) div.style.borderTop = 'none';
                if (cell.east) div.style.borderRight = 'none';
                if (cell.south) div.style.borderBottom = 'none';
                if (cell.west) div.style.borderLeft = 'none';
            }
            mazeContainer.appendChild(div);
        });
        mazeContainer.appendChild(document.createElement('br')); // Line break after each row
    });
}

// Function to calculate the route
function calculateRoute() {
    route = []; // Clear route stack
    visitCell(data.start.row, data.start.col);
    animateRoute();
}

function visitCell(row, col) {
    if (row < 0 || row >= data.rows || col < 0 || col >= data.cols) {
        return false;
    }
    
    console.log('Visiting cell at row:', row, 'col:', col);

    const cell = data.maze[row][col];
    console.log('Current cell:', cell);
    
    if (cell.visited) {
        console.log('Cell already visited:', row, col);
        return false;
    }
    
    cell.visited = true; // Mark cell as visited
    
    route.push(cell);
    
    if (row === data.goal.row && col === data.goal.col) {
        console.log('Goal reached');
        return true;
    }
    
    if (cell.north && visitCell(row - 1, col)) return true;
    if (cell.east && visitCell(row, col + 1)) return true;
    if (cell.south && visitCell(row + 1, col)) return true;
    if (cell.west && visitCell(row, col - 1)) return true;
    
    console.log('Backtracking from cell at row:', row, 'col:', col);
    route.pop();
    return false;
}



function animateRoute() {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= route.length) {
            clearInterval(interval);
            // Highlight the goal cell
            const goalDiv = document.querySelector(`.cell[data-row="${data.goal.row}"][data-col="${data.goal.col}"]`);
            goalDiv.classList.add('goal-reached');
            return;
        }
        const cell = route[i];
        const div = document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
        if (!div) {
            console.error('Div not found for cell:', cell);
            clearInterval(interval);
            return;
        }
        div.classList.add('visited');
        i++;
    }, 200); // Adjust the interval for animation speed
}




// Function to show the route in the maze view
function showRoute() {
    route.forEach(cell => {
        const div = document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
        if (div) {
            div.classList.add('route');
        }
    });
}



// Function to calculate the route
function calculateRoute() {
    route = []; // Clear route stack
    visitCell(data.start.row, data.start.col);
    showRoute(); // Call the function to show the route
    animateRoute();
}


// Function to reset maze and route
function resetMaze() {
    generateMazeGrid();
    route.forEach(cell => {
        const div = document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
        div.classList.remove('visited');
        div.classList.remove('route'); // Remove the route class
    });
}



// Event listeners for buttons
document.getElementById('solve-btn').addEventListener('click', calculateRoute);
document.getElementById('reset-btn').addEventListener('click', resetMaze);

// Initialize
fetchMazeData().then(generateMazeGrid);
