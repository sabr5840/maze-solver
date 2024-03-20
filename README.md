# Maze Solver README

## Introduction
This project is a maze solver implemented in JavaScript. It provides a visual representation of a maze and employs the Depth-First Search algorithm to find a path from the start to the goal. This README aims to provide a detailed understanding of the project, including the algorithms used, implementation intricacies, and additional insights.

## Deployment via GitHub Pages
- The project is accessible via GitHub Pages at the following link: [Maze Solver GitHub Pages](https://sabr5840.github.io/maze-solver/). Users can interact with the maze solver directly through this link.
- The project was last deployed by @sabr5840.

## Features
- **Depth-First Search Algorithm**: The core of the maze-solving mechanism relies on the Depth-First Search (DFS) algorithm. DFS explores the maze by diving as deep as possible along a path before backtracking and exploring other potential paths. This approach ensures thorough exploration of the maze space.
- **Recursive Nature**: The DFS algorithm is implemented recursively, reflecting the natural recursive nature of exploring a maze. Recursive function calls enable the traversal through maze cells, facilitating the discovery of viable paths towards the goal.
- **Stack for Path Tracing**: While DFS operates recursively, a stack is utilized to track the path taken. This stack-based approach allows for efficient backtracking when encountering dead-ends, ensuring the solver follows the correct route to reach the goal.
- **Visual Representation**: The solving process is visually depicted in the browser using HTML and CSS. Each cell in the maze is colored to denote its status, including visited cells, the route taken, dead-ends, the start, and the goal. This visual feedback aids in understanding the solving process.
- **JSON Data Input**: The maze structure is provided through a JSON file, which contains essential information such as maze dimensions, the starting point, the goal location, and the layout of walls. This modular approach enables easy integration of different maze configurations.

## Algorithm Used
The maze-solving algorithm employed in this project is Depth-First Search (DFS). DFS is a fundamental graph traversal algorithm that explores the maze in a systematic manner, ensuring every possible path is thoroughly examined. By leveraging DFS, the solver efficiently navigates through the maze space towards the goal.

## Implementation Details
- **Recursion**: DFS is implemented recursively, reflecting the recursive nature of maze exploration. Recursive function calls allow for the systematic traversal of maze cells, enabling the solver to discover potential paths towards the goal.
- **Stack Usage**: Despite the recursive nature of DFS, a stack data structure is utilized to maintain the path taken during exploration. This stack-based approach enables efficient backtracking when encountering dead-ends, ensuring the solver follows the correct route towards the goal.
- **Visualization**: The solving process is visualized step-by-step in the browser. Cells are dynamically colored to represent various states, including visited cells, the route taken, dead-ends, the start, and the goal. This visual feedback enhances the understanding of the solving process.

## Additional Information
- The maze structure is loaded from a JSON file, ensuring flexibility and modularity in maze configurations.
- The solving process initiates automatically upon loading the page, providing immediate feedback to the user.
- The runtime of the maze-solving algorithm may vary depending on the complexity of the maze and the efficiency of the implementation.

