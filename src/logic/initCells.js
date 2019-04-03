import {create} from './cellManager'

const initCells = () => {
    const isToAddThirdCells = Math.random() > 0.5;

    const cell1 = create(getRandomCoord(), getRandomCoord(), Math.random() > 0.9 ? 4 : 2);
    const cell2 = create(getRandomCoord(), getRandomCoord(), Math.random() > 0.9 ? 4 : 2);

    if (cell1.x === cell2.x && cell1.y === cell2.y) {
        cell1.x = cell1.x === 0 ? 1 : cell1.x - 1
    }

    if (isToAddThirdCells) {
        const cell3 = create(getRandomCoord(), getRandomCoord(), Math.random() > 0.9 ? 4 : 2);

        if (cell3.x === cell1.x && cell3.y === cell1.y) {
            cell3.y = cell3.y === 0 ? 1 : cell1.y - 1
        }

        if (cell3.x === cell2.x && cell3.y === cell2.y) {
            cell3.y = cell3.y === 0 ? 1 : cell2.y - 1
        }

        return [cell1, cell2, cell3];
    }

    return [cell1, cell2];
};

const getRandomCoord = () => {
    return Math.floor(Math.random() * 4);
};

export default initCells