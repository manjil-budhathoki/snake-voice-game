const GRID_SIZE = 20;

export const getNextHead = (head, direction) => {
  switch (direction) {
    case 'UP': return head - GRID_SIZE;
    case 'DOWN': return head + GRID_SIZE;
    case 'LEFT': return head % GRID_SIZE === 0 ? head : head - 1;
    case 'RIGHT': return (head + 1) % GRID_SIZE === 0 ? head : head + 1;
    default: return head;
  }
};

export const updateGrid = (snake, foodIndex, trail) => {
  const grid = new Array(GRID_SIZE * GRID_SIZE).fill('');
  snake.forEach(i => grid[i] = 'snake');
  grid[foodIndex] = 'food';
  trail.forEach(i => grid[i] = 'trail');
  return grid;
};

export const createInitialState = () => ({
  snake: [42],
  food: 100,
  direction: 'RIGHT',
  trail: [],
  score: 0,
  highScore: Number(localStorage.getItem('highScore')) || 0
});

export const getRandomFood = (gridSize, snake) => {
  let newFood;
  do {
    newFood = Math.floor(Math.random() * (gridSize * gridSize));
  } while (snake.includes(newFood));
  return newFood;
};

export const checkCollision = (head, snake) => {
  const GRID_SIZE = 20;

  if (
    head < 0 ||
    head >= GRID_SIZE * GRID_SIZE ||
    (snake[0] % GRID_SIZE === 0 && head === snake[0] - 1) ||
    (snake[0] % GRID_SIZE === GRID_SIZE - 1 && head === snake[0] + 1)
  ) {
    return true;
  }

  return snake.includes(head);
};
