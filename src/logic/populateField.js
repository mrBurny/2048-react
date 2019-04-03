import {create} from './cellManager'

const populateField = cells => {
    const occupiedCoords = new Set();

    cells.forEach(cell => occupiedCoords.add(cell.x * 4 + cell.y));

    if (occupiedCoords.size === 16) {
        return
    }

    let x;
    let y;
    let startSize = occupiedCoords.size;
    do {
        x = Math.floor(Math.random() * 4);
        y = Math.floor(Math.random() * 4);

        const sum = x * 4 + y;
        occupiedCoords.add(sum)
    } while (startSize === occupiedCoords.size);

    return [...cells, create(x, y, Math.random() > 0.9 ? 4 : 2)]
};

export {populateField}