function make2DArray(rows, cols) {
    let arr = new Array(cols);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows)
    }

    return arr;
}

let grid;
let cols;
let rows;
let resolution = 15;

function setup() {
    createCanvas(1200, 600);
    cols = width / resolution;
    rows = height / resolution;

    frameRate(5)
    grid = make2DArray(rows, cols);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2))
        }
    }
}

function draw() {
    // background(255, 255, 0);
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                // fill(0, 0, 255);
                fill(255)
                    // stroke(0);
                rect(x, y, resolution - 1, resolution - 1)
            }
        }
    }

    let next = make2DArray(rows, cols);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbors = 0;
            neighbors = countNeighbors(grid, i, j);

            if ((neighbors < 2 || neighbors > 3) && state == 1) {
                next[i][j] = 0
            } else if (neighbors == 3 && state == 0) {
                next[i][j] = 1
            } else {
                next[i][j] = state
            }
        }
    }

    grid = next;

}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row]
        }
    }
    sum -= grid[x][y]
    return sum;
}