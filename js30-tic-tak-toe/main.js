const container = document.querySelector('.container');
const btnDialogOPEN = document.getElementById('openDialog');
const dialog = document.querySelector('dialog');
const btnDialogCLOSE = document.getElementById('closeDialog');
const changeUsers = document.querySelector('.changeUsers');
const result_nebr = document.querySelector('[data-nebr="nebr"]');
const result_win_x = document.querySelector('[data-win="x"]');
const result_win_o = document.querySelector('[data-win="o"]');
const result_win_ai = document.querySelector('[data-win="ai"]');
const result_name_ai = document.querySelector('[data-player="ai"]');
const result_name_o = document.querySelector('[data-player="o"]');
const button_ai = document.querySelector('[data-users="ai"]');
const button_player = document.querySelector('[data-users="o"]');
const title_game = document.querySelector('.title_game');
const tbody = document.querySelector('tbody');
let isAI = false;
let player_ai;
let player = 'x';
let steps = '';
let positionX = [];
let positionO = [];
let allPositions = [];
let positionAi = [];
let isWinner = false;
let stepsCrossWinnersPositions = [];
let emptyPositions = [];
let steps_users = {
  x: 0,
  o: 0,
  ai: 0,
  getStep(value) {
    this[value] += 1;
  },
};
let tableResults = {
  games: {
    x: {
      win: 0,
      steps: {},
    },
    o: {
      win: 0,
      steps: {},
    },
    ai: {
      win: 0,
      steps: {},
    },
  },
  nebr: 0,
  getScore(player_name, value_step) {
    this.games[player_name].steps['win-' + this.games[player_name].win] =
      value_step;
  },
};
let gamesResult = {
  '1vs1': {
    x: 0,
    'steps-x': {},
    o: 0,
    'steps-o': {},
    nebr: 0,
  },
  '1vsAI': {
    x: 0,
    'steps-x': {},
    ai: 0,
    'steps-ai': {},
    nebr: 0,
  },
};
const winnerPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

const dialogClose = () => {
  dialog.close();
};
const dialogOpen = () => {
  dialog.showModal();
};

btnDialogOPEN.addEventListener('click', dialogOpen);
btnDialogCLOSE.addEventListener('click', dialogClose);

function createGameField() {
  for (let i = 8; i >= 0; i--) {
    allPositions.unshift(i);
    const div = document.createElement('div');
    div.className = 'box';
    div.setAttribute('data-id', `${i}`);
    const cross = document.createElement('div');
    cross.className = 'cross';
    const line = document.createElement('div');
    line.className = 'line';
    const line2 = line.cloneNode(line);
    const zero = document.createElement('div');
    zero.className = 'zero';
    const circle = document.createElement('div');
    circle.className = 'circle';

    cross.appendChild(line);
    cross.appendChild(line2);
    zero.append(circle);

    div.addEventListener('click', getSign);

    div.insertAdjacentElement('afterbegin', zero);
    div.insertAdjacentElement('afterbegin', cross);
    container.insertAdjacentElement('afterbegin', div);
  }
}

createGameField();

function createScoreList(obj, player) {
  let winPlayer = obj[player];
  let winX = obj.x;
  let nebr = obj.nebr;
  let arrX = [];
  let arrPlayer = [];

  for (let prop in obj['steps-x']) {
    arrX.push(obj['steps-x'][prop]);
  }
  for (let prop in obj[`steps-${player}`]) {
    arrPlayer.push(obj[`steps-${player}`][prop]);
  }
  let length = arrX.length > arrPlayer.length ? arrX.length : arrPlayer.length;

  let allArr = [];
  allArr.push(arrX);
  allArr.push(arrPlayer);

  result_win_x.innerHTML = winX;
  if (player === 'o') {
    result_win_o.innerHTML = winPlayer;
  } else if (player === 'ai') {
    result_win_ai.innerHTML = winPlayer;
  }
  result_nebr.innerHTML = `Nebr : ${nebr}`;
  if (length > 0 && player === 'o') {
    renderList(allArr, player);
  } else if (length > 0 && player === 'ai') {
    renderList(allArr, player);
  } else {
    tbody.innerHTML = '';
  }

  function renderList(arr, player_name) {
    tbody.innerHTML = '';
    for (let i = 0; i < length; i++) {
      let tr = document.createElement('tr');
      let x = document.createElement('td');
      x.innerHTML = allArr[0][i];
      if (x.innerHTML === 'undefined') {
        x.innerHTML = '';
      }
      let ai = document.createElement('td');
      ai.innerHTML = allArr[1][i];
      ai.classList.add(`${player}`);
      if (ai.innerHTML === 'undefined') {
        ai.innerHTML = '';
      }
      tr.append(x);
      tr.append(ai);
      tbody.append(tr);
    }
  }
}

const changeGame = (value) => {
  let classO = [...document.getElementsByClassName('o')];
  let classAi = [...document.getElementsByClassName('ai')];

  if (value === 'ai') {
    createScoreList(gamesResult['1vsAI'], value);
    isAI = true;
    button_ai.classList.add('active');
    button_player.classList.remove('active');
    title_game.innerHTML = button_ai.innerHTML;
    result_name_ai.classList.remove('hidden-result');
    result_name_o.classList.add('hidden');
    result_win_ai.classList.remove('hidden-result');
    classAi.forEach((el) => {
      el.classList.remove('hidden-result');
    });
    classO.forEach((el) => {
      el.classList.add('hidden-result');
    });
    tableResults['player'] = value;
    localStorage.setItem('whoPlay', value);
  } else if (value === 'o') {
    createScoreList(gamesResult['1vs1'], value);
    isAI = false;
    button_ai.classList.remove('active');
    button_player.classList.add('active');
    result_name_ai.classList.add('hidden-result');
    result_name_o.classList.remove('hidden');
    result_win_ai.classList.add('hidden-result');
    classO.forEach((el) => {
      el.classList.remove('hidden-result');
    });
    classAi.forEach((el) => {
      el.classList.add('hidden-result');
    });
    title_game.innerHTML = button_player.innerHTML;
    tableResults['player'] = value;
    localStorage.setItem('whoPlay', value);
  }
  restartGame();
};

if (localStorage.getItem('results') && localStorage.getItem('results-2')) {
  let data = JSON.parse(localStorage.getItem('results'));
  let data2 = JSON.parse(localStorage.getItem('results-2'));
  gamesResult = data;
  tableResults = data2;
  tableResults.getScore = function (player_name, value_step) {
    this.games[player_name].steps['win-' + this.games[player_name].win] =
      value_step;
  };
}

if (localStorage.getItem('whoPlay')) {
  let played = localStorage.getItem('whoPlay');
  changeGame(played);
} else {
  changeGame('o');
  localStorage.setItem('whoPlay', 'o');
  tableResults['player'] = 'o';
}
changeUsers.querySelectorAll('.users').forEach((button) => {
  button.addEventListener('click', function () {
    let value = this.dataset.users;
    changeGame(value);
  });
});

function crossSign(param) {
  checkCell(param);
  const cell = [...param.children[0].children];
  const value_cell = parseInt(param.dataset.id);

  cell.forEach((el) => {
    if (!el.classList.contains('active-cross')) {
      el.classList.add('active-cross');
    }
  });

  player_ai = '';
  positionX.push(value_cell);
  if (positionX.length > 2) {
    checkPositions(value_cell, positionX);
  }

  deletePositionAfterStep(value_cell);

  makeStep();
  checkSteps(steps);

  if (positionX.length === 1) {
    positionX.forEach((number) => {
      for (let i = 0; i < winnerPositions.length; i++) {
        let winnerArr = winnerPositions[i];
        if (winnerArr.indexOf(number) !== -1) {
          stepsCrossWinnersPositions.push(winnerArr);
        }
        if (winnerArr.indexOf(number) === -1) {
          emptyPositions.push(winnerArr);
        }
      }
    });
  } else if (positionX.length > 1) {
    stepsCrossWinnersPositions = [];
    emptyPositions = [];
  }
  steps_users.getStep(player);
  player_ai = 'ai';

  if (isAI) {
    choseAi(emptyPositions);
  } else {
    player = 'o';
  }
}

function aiSign(emptyPosition_Value) {
  if (allPositions.length === 0) {
    return;
  }

  if (!isWinner) {
    let cell;
    let value_cell;
    if (positionAi.length === 0) {
      let randomNumber_length = Math.floor(
        Math.random() * emptyPosition_Value.length
      );
      let randomNumber_arr = Math.floor(
        Math.random() * emptyPositions[randomNumber_length].length
      );
      value_cell = emptyPositions[randomNumber_length][randomNumber_arr];
      cell = container.querySelector(`[data-id="${value_cell}"]`);
    } else if (positionAi.length === 1) {
      let numberOfWinnerPositionCross = [];
      getNumberOfWinnerPosition(
        allPositions,
        positionX,
        numberOfWinnerPositionCross
      );

      if (numberOfWinnerPositionCross.length === 1) {
        value_cell = numberOfWinnerPositionCross[0];
        cell = container.querySelector(`[data-id="${value_cell}"]`);
      } else if (numberOfWinnerPositionCross.length === 0) {
        let numberOfWinnerPositionAI_arr = [];
        positionAi.forEach((number) => {
          for (let i = 0; i < winnerPositions.length; i++) {
            let winnerArr = winnerPositions[i];
            if (winnerArr.indexOf(number) !== -1) {
              numberOfWinnerPositionAI_arr.push(winnerArr);
            }
          }
        });

        if (numberOfWinnerPositionAI_arr.length === 1) {
          value_cell = numberOfWinnerPositionAI_arr[0];
          cell = container.querySelector(`[data-id="${value_cell}"]`);
        } else if (numberOfWinnerPositionAI_arr.length > 1) {
          let numbersWinnerAI = [];
          for (let i = 0; i < numberOfWinnerPositionAI_arr.length; i++) {
            for (let j = 0; j < numberOfWinnerPositionAI_arr[i].length; j++) {
              allPositions.forEach((el) => {
                if (el == numberOfWinnerPositionAI_arr[i][j]) {
                  numbersWinnerAI.push(el);
                }
              });
            }
          }
          let randomNumber_arr = Math.floor(
            Math.random() * numbersWinnerAI.length
          );
          value_cell = numbersWinnerAI[randomNumber_arr];
          cell = container.querySelector(`[data-id="${value_cell}"]`);
        }
      }
    } else if (positionAi.length === 2 || positionAi.length === 3) {
      let numberOfWinnerPositionAi_arr = [];
      let numberOfWinnerPositionCross_arr = [];
      getNumberOfWinnerPosition(
        allPositions,
        positionAi,
        numberOfWinnerPositionAi_arr
      );
      getNumberOfWinnerPosition(
        allPositions,
        positionX,
        numberOfWinnerPositionCross_arr
      );
      if (
        numberOfWinnerPositionCross_arr.length >= 2 &&
        numberOfWinnerPositionAi_arr.length >= 2
      ) {
        let randomNumber = Math.floor(
          Math.random() * numberOfWinnerPositionAi_arr.length
        );
        value_cell = numberOfWinnerPositionAi_arr[randomNumber];
        cell = container.querySelector(`[data-id="${value_cell}"]`);
      }
      if (
        numberOfWinnerPositionCross_arr.length >= 1 &&
        numberOfWinnerPositionAi_arr.length >= 1
      ) {
        if (numberOfWinnerPositionAi_arr.length === 1) {
          value_cell = numberOfWinnerPositionAi_arr[0];
          if (numberOfWinnerPositionAi_arr.length >= 1) {
            let randomNumber = Math.floor(
              Math.random() * numberOfWinnerPositionAi_arr.length
            );
            value_cell = numberOfWinnerPositionAi_arr[randomNumber];
          }
          cell = container.querySelector(`[data-id="${value_cell}"]`);
        }
      }
      if (
        numberOfWinnerPositionAi_arr.length >= 1 &&
        numberOfWinnerPositionCross_arr.length == 0
      ) {
        if (numberOfWinnerPositionAi_arr.length == 1) {
          value_cell = numberOfWinnerPositionAi_arr[0];
        } else {
          let randomNumber = Math.floor(
            Math.random() * numberOfWinnerPositionAi_arr.length
          );
          value_cell = numberOfWinnerPositionAi_arr[randomNumber];
        }
        cell = container.querySelector(`[data-id="${value_cell}"]`);
      }
      if (
        numberOfWinnerPositionCross_arr.length >= 1 &&
        numberOfWinnerPositionAi_arr.length == 0
      ) {
        if (numberOfWinnerPositionCross_arr.length == 1) {
          value_cell = numberOfWinnerPositionCross_arr[0];
        } else {
          let randomNumber = Math.floor(
            Math.random() * numberOfWinnerPositionCross_arr.length
          );
          value_cell = numberOfWinnerPositionCross_arr[randomNumber];
        }
        cell = container.querySelector(`[data-id="${value_cell}"]`);
      }
      if (
        numberOfWinnerPositionCross_arr.length == 0 &&
        numberOfWinnerPositionAi_arr.length == 0
      ) {
        let randomNumber = Math.floor(Math.random() * allPositions.length);
        value_cell = allPositions[randomNumber];

        cell = container.querySelector(`[data-id="${value_cell}"]`);
      }
    }

    checkCell(cell);
    let circle = cell.children[1].lastChild;
    if (!circle.classList.contains('active-zero')) {
      circle.classList.add('active-zero');
    }

    positionAi.push(value_cell);
    if (positionAi.length > 2) {
      checkPositions(value_cell, positionAi);
    }
    deletePositionAfterStep(value_cell);

    makeStep();
    checkSteps(steps);
    steps_users.getStep(player_ai);
    player = 'x';
  }
}
function getNumberOfWinnerPosition(
  allPositions_value,
  positionAi_value,
  arr_with_result
) {
  allPositions_value.forEach((number) => {
    let test = [];

    test.push(number);
    positionAi_value.forEach((el) => {
      test.push(el);
    });
    for (let i = 0; i < winnerPositions.length; i++) {
      let someArr = winnerPositions[i];
      let count = 0;
      if (someArr.indexOf(number) !== -1) {
        for (let j = 0; j < someArr.length; j++) {
          if (test.indexOf(someArr[j]) !== -1) {
            count++;
            if (count === 3) {
              arr_with_result.push(test.shift());
            }
          }
        }
      }
    }
  });
}
function zeroSign(param) {
  checkCell(param);
  let cell = param.children[1].firstChild;
  let value_cell = parseInt(param.dataset.id);

  if (!cell.classList.contains('active-zero')) {
    cell.classList.add('active-zero');
  }
  positionO.push(value_cell);
  if (positionO.length > 2) {
    checkPositions(value_cell, positionO);
  }

  deletePositionAfterStep(value_cell);

  makeStep();
  checkSteps(steps);
  steps_users.getStep(player);
  player = 'x';
}

function getSign() {
  if (isAI) {
    crossSign(this);
  } else {
    player === 'x' ? crossSign(this) : zeroSign(this);
  }
}

function makeStep() {
  steps === '' ? (steps = 1) : (steps += 1);
}

function checkCell(cell) {
  if (!cell.classList.contains('played')) {
    cell.classList.add('played');
    cell.removeEventListener('click', getSign);
  }
}

function stylingWinner(param) {
  let boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    box.removeEventListener('click', getSign);
  });

  let winner;
  if (isAI) {
    if (player_ai === 'ai') {
      winner = player_ai;
    } else if (player_ai === 'ai' && winner === 'x') {
      winner = 'x';
    } else {
      winner = 'x';
    }
  } else {
    winner = player;
  }

  isWinner = true;
  tableResults.games[winner].win += 1;
  tableResults.getScore(winner, steps_users[winner] + 1);

  let arr = (param + '').split(',');

  arr.forEach((el) => {
    let winnersBox = document.querySelector(`[data-id="${el}"]`);
    if (winner === 'x') {
      let arr = [...winnersBox.children[0].children];
      arr.forEach((line) => {
        line.style.backgroundColor = 'white';
      });
    } else {
      let arr = [...winnersBox.children[1].children];
      arr.forEach((circle) => {
        circle.style.border = '5px solid white';
      });
    }
  });
  let game = getNameGame();
  if (tableResults.games[winner].win > 10) {
    setTimeout(() => {
      alert('WIN 10! Try again!');
      restartGame();
    }, 420);
    result_nebr.innerHTML = `Nebr : 0`;
    resetTableResults(tableResults);
    gamesResult['1vs1'].nebr = 0;
    gamesResult['1vsAI'].nebr = 0;
    if (game === 'xo') {
      getGamesResults('x', 'o', '1vs1');
      createScoreList(gamesResult['1vs1'], 'o');
    } else if (game === 'xai') {
      getGamesResults('x', 'ai', '1vsAI');
      createScoreList(gamesResult['1vsAI'], 'ai');
    }
  } else {
    if (game === 'xo') {
      getGamesResults('x', 'o', '1vs1');
      createScoreList(gamesResult['1vs1'], 'o');
      console.log(steps);
      setTimeout(() => {
        alert(`Winner ${winner.toUpperCase()} ! Step: ${steps_users[winner]}`);
        restartGame();
      }, 420);
    } else if (game === 'xai') {
      getGamesResults('x', 'ai', '1vsAI');
      createScoreList(gamesResult['1vsAI'], 'ai');
      setTimeout(() => {
        alert(`Winner ${winner.toUpperCase()} ! Step: ${steps_users[winner]}`);
        restartGame();
      }, 420);
    }
  }
  saveToLocalStorage(gamesResult, tableResults);
}

function resetTableResults(object) {
  for (let props in object) {
    if (props === 'games') {
      for (let props_games in object[props]) {
        object[props][props_games].win = 0;
        object[props][props_games].steps = {};
      }
    }
  }
}
function getNameGame() {
  let nameOfGame = 'game';
  for (let prop in steps_users) {
    if (prop === 'ai' || prop === 'o' || prop === 'x') {
      if (steps_users[prop] > 0) {
        nameOfGame += prop;
      }
    }
  }
  return nameOfGame.slice(4, nameOfGame.length);
}
function getGamesResults(player1, player2, version) {
  let countX = tableResults.games[player1].win;
  let stepsX = Object.assign({}, tableResults.games[player1].steps);
  gamesResult[version][player1] = countX;
  gamesResult[version][`steps-${player1}`] = stepsX;
  let countO = tableResults.games[player2].win;
  let stepsO = Object.assign({}, tableResults.games[player2].steps);
  gamesResult[version][player2] = countO;
  gamesResult[version][`steps-${player2}`] = stepsO;
  return gamesResult;
}
function saveToLocalStorage(object1, object2) {
  localStorage.setItem('results', JSON.stringify(object1));
  localStorage.setItem('results-2', JSON.stringify(object2));
}

function checkSteps(step) {
  if (step === 9 && isWinner === false) {
    tableResults.nebr += 1;
    let game = getNameGame();
    if (game === 'xo') {
      gamesResult['1vs1'].nebr += 1;
      result_nebr.innerHTML = `Nebr : ${gamesResult['1vs1'].nebr}`;
    } else if (game === 'xai') {
      gamesResult['1vsAI'].nebr += 1;
      result_nebr.innerHTML = `Nebr : ${gamesResult['1vsAI'].nebr}`;
    }
    if (gamesResult['1vs1'].nebr > 10 || gamesResult['1vsAI'].nebr > 10) {
      result_nebr.innerHTML = `Nebr : 0`;
      resetTableResults(tableResults);
      gamesResult['1vs1'].nebr = 0;
      gamesResult['1vsAI'].nebr = 0;
      setTimeout(() => {
        alert('Warning!!! 10 Nebr!!! Lets try again!');
        restartGame();
      }, 450);
    } else {
      setTimeout(() => {
        alert('Nebr!');
        restartGame();
      }, 450);
    }
    saveToLocalStorage(gamesResult, tableResults);
  }
}
function choseAi(emptyParam) {
  aiSign(emptyParam);
}
function deletePositionAfterStep(param) {
  allPositions.splice(
    allPositions.indexOf(
      allPositions.find((el) => {
        return el === param;
      })
    ),
    1
  );
}
function filtersPosition(test, posX) {
  let set1 = new Set([...test, ...posX]);
  posX.forEach((el) => {
    set1.delete(el);
  });

  return Array.from(set1) + '';
}
function checkPositions(number, arr) {
  let test = [];
  for (let i = 0; i < winnerPositions.length; i++) {
    let someArr = winnerPositions[i];
    let count = 0;
    if (someArr.indexOf(number) !== -1) {
      for (let j = 0; j < someArr.length; j++) {
        if (arr.indexOf(someArr[j]) !== -1) {
          count++;
          if (count === 3) {
            test.push(someArr);
          }
        }
      }
      count = 0;
    }
  }
  if (test.length > 1) {
    stylingWinner(test[0]);
  } else {
    if (test.length === 0) {
      return;
    }
    stylingWinner(test);
  }
}

function restartGame() {
  steps = 0;
  player = 'x';
  container.innerHTML = '';
  positionO = [];
  positionX = [];
  positionAi = [];
  allPositions = [];
  isWinner = false;
  stepsCrossWinnersPositions = [];
  emptyPositions = [];
  steps_users.x = 0;
  steps_users.o = 0;
  steps_users.ai = 0;
  createGameField();
}
