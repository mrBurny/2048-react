import {cloneDeep} from 'lodash'

const directions = {
    UP: [0, 1],
    DOWN: [0, -1],
    LEFT: [1, 0],
    RIGHT: [-1, 0]
};

const moveCells = (initCells, direction) => {
    const cells = cloneDeep(initCells);
    const [deltaX, deltaY] = direction;

    const matrix = Array.from(
        new Array(4),
        () => Array.from(
            new Array(4),
            () => 0
        )
    );
    const checkMatrix = Array.from(
        new Array(4),
        () => Array.from(
            new Array(4),
            () => 0
        )
    );

    cells.forEach(cell => {
        matrix[cell.y][cell.x] = cell;
        checkMatrix[cell.y][cell.x] = cell;
    });

    let playgroundChanged = false;

    if (deltaY === 0) {
        playgroundChanged = moveHorizontally(matrix, deltaX);
    }

    if (deltaX === 0) {
        playgroundChanged = moveVertically(matrix, deltaY);
    }

    return { cells: cells.filter(cell => !cell.merged), playgroundChanged: playgroundChanged };
};

const moveHorizontally = (matrix, deltaX) => {
    const startX = deltaX === 1 ? 0 : 3;

    let playgroundChanged = false;

    for (let y = 0; y < 4; y++) {
        let processingX = startX;
        let processingValue = 0;

        for (let x = startX; x !== -1 && x !== 4; x += deltaX) {
            if (matrix[y][x] !== 0) {
                if (processingValue === 0) {
                    const moveResult = moveCell(x, y, matrix, processingX, y);
                    processingValue = moveResult.value;

                    playgroundChanged |= moveResult.playgroundChanged;
                } else {
                    if (processingValue === matrix[y][x].value) {
                        processingValue = mergeCell(x, y, matrix, processingX, y);
                        processingX += deltaX;

                        playgroundChanged = true;
                    } else {
                        processingX += deltaX;
                        const moveResult = moveCell(x, y, matrix, processingX, y);
                        processingValue = moveResult.value;

                        playgroundChanged |= moveResult.playgroundChanged;
                    }
                }
            }
        }
    }

    return playgroundChanged;
};

const moveVertically = (matrix, deltaY) => {
    const startY = deltaY === 1 ? 0 : 3;

    let playgroundChanged = false;

    for (let x = 0; x < 4; x++) {
        let processingY = startY;
        let processingValue = 0;

        for (let y = startY; y !== -1 && y !== 4; y += deltaY) {
            if (matrix[y][x] !== 0) {
                if (processingValue === 0) {
                    const moveResult = moveCell(x, y, matrix, x, processingY);
                    processingValue = moveResult.value;

                    playgroundChanged |= moveResult.playgroundChanged;
                } else {
                    if (processingValue === matrix[y][x].value) {
                        processingValue = mergeCell(x, y, matrix, x, processingY);
                        processingY += deltaY;

                        playgroundChanged = true;
                    } else {
                        processingY += deltaY;
                        const moveResult = moveCell(x, y, matrix, x, processingY);
                        processingValue = moveResult.value;

                        playgroundChanged |= moveResult.playgroundChanged;
                    }
                }
            }
        }
    }

    return playgroundChanged;
};

const moveCell = (x, y, matrix, targetX, targetY) => {
    const temp = matrix[y][x];
    matrix[y][x] = 0;
    matrix[targetY][targetX] = temp;
    matrix[targetY][targetX].x = targetX;
    matrix[targetY][targetX].y = targetY;

    return { value: matrix[y][targetX].value, playgroundChanged: targetX !== x || targetY !== y };
};

const mergeCell = (x, y, matrix, targetX, targetY) => {
    matrix[y][x].merged = true;
    matrix[y][x] = 0;
    matrix[targetY][targetX].value *= 2;

    return 0;
};

export {moveCells, directions}