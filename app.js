// Definicja tablicy reprezentującej planszę
const board = [
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '1', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', 'Y', '0', 'X'],
  ['X', '0', '0', 'X', 'X', 'X', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', 'Y', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
];

// Definicja kierunków ruchu
const directions = [
  [-1, 0], // góra
  [1, 0],  // dół
  [0, -1], // lewo
  [0, 1]   // prawo
];

let currentDirection = [1, 0]; // Początkowy kierunek ruchu: dół
let ballPosition = { x: 1, y: 1 }; // Początkowa pozycja piłki

// Funkcja tworząca elementy HTML reprezentujące planszę
function createBoardElement(board) {
  const boardElement = document.getElementById('board'); // Pobranie elementu DOM z ID 'board'
  boardElement.innerHTML = ''; // Wyczyszczenie zawartości elementu
  board.forEach((row, rowIndex) => { // Iteracja przez wiersze planszy
      row.forEach((cell, colIndex) => { // Iteracja przez kolumny wiersza
          const cellElement = document.createElement('div'); // Utworzenie elementu 'div' dla komórki
          cellElement.classList.add('cell'); // Dodanie klasy 'cell' do elementu
          if (cell === 'X') { // Jeśli komórka jest ścianą
              cellElement.classList.add('wall');
          } else if (cell === '0') { // Jeśli komórka jest ścieżką
              cellElement.classList.add('path');
          } else if (cell === 'Y') { // Jeśli komórka jest specjalna
              cellElement.classList.add('special');
          } else if (cell === '1') { // Jeśli komórka zawiera piłkę
              cellElement.classList.add('ball');
          }
          cellElement.dataset.row = rowIndex; // Ustawienie atrybutu data-row z indeksem wiersza
          cellElement.dataset.col = colIndex; // Ustawienie atrybutu data-col z indeksem kolumny
          boardElement.appendChild(cellElement); // Dodanie elementu komórki do planszy
      });
  });
}

// Funkcja poruszająca piłką
function moveBall() {
  const [dx, dy] = currentDirection; // Rozpakowanie bieżącego kierunku ruchu
  let newX = ballPosition.x + dx; // Nowa pozycja X piłki
  let newY = ballPosition.y + dy; // Nowa pozycja Y piłki

  if (board[newX][newY] === 'X') { // Jeśli nowa pozycja to ściana
      changeDirection(); // Zmień kierunek ruchu
  } else if (board[newX][newY] === 'Y') { // Jeśli nowa pozycja to komórka specjalna
      board[newX][newY] = '0'; // Zmień komórkę specjalną na ścieżkę
      changeDirection(); // Zmień kierunek ruchu
  } else {
      board[ballPosition.x][ballPosition.y] = '0'; // Ustaw bieżącą pozycję piłki jako ścieżkę
      ballPosition = { x: newX, y: newY }; // Aktualizuj pozycję piłki
      board[ballPosition.x][ballPosition.y] = '1'; // Ustaw nową pozycję piłki
  }

  createBoardElement(board); // Aktualizuj element HTML planszy
}

// Funkcja zmieniająca kierunek ruchu piłki
function changeDirection() {
  const possibleDirections = directions.filter(dir => !(dir[0] === -currentDirection[0] && dir[1] === -currentDirection[1])); // Filtracja kierunków, aby unikać ruchu wstecz
  currentDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)]; // Losowy wybór nowego kierunku z możliwych kierunków
}

// Funkcja symulująca ruch piłki
function simulate() {
  createBoardElement(board); // Utworzenie elementów HTML planszy
  setInterval(() => {
      moveBall(); // Poruszaj piłką co 100 ms
  }, 100);
}

simulate(); // Rozpoczęcie symulacji
