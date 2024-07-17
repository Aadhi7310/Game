document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const boardSize = 4;
    const tiles = [];

    function createBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            gameBoard.appendChild(tile);
            tiles.push(tile);
        }
        addRandomTile();
        addRandomTile();
    }

    function addRandomTile() {
        let emptyTiles = tiles.filter(tile => !tile.textContent);
        if (emptyTiles.length === 0) return;

        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        randomTile.textContent = Math.random() < 0.9 ? 2 : 4;
        randomTile.className = 'tile tile-' + randomTile.textContent;
    }

    function move(direction) {
        let moved = false;

        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                let index = direction === 'left' || direction === 'right' ? (i * boardSize + j) : (j * boardSize + i);
                row.push(parseInt(tiles[index].textContent) || 0);
            }
            if (direction === 'right' || direction === 'down') row.reverse();
            let newRow = row.filter(num => num);
            while (newRow.length < boardSize) newRow.push(0);

            for (let j = 0; j < boardSize; j++) {
                let index = direction === 'left' || direction === 'right' ? (i * boardSize + j) : (j * boardSize + i);
                if (direction === 'right' || direction === 'down') index = direction === 'right' ? (i * boardSize + (boardSize - 1 - j)) : ((boardSize - 1 - j) * boardSize + i);
                let value = newRow[j];
                tiles[index].textContent = value === 0 ? '' : value;
                tiles[index].className = 'tile tile-' + value;
                if (value !== row[j]) moved = true;
            }
        }

        if (moved) addRandomTile();
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    });

    createBoard();
});