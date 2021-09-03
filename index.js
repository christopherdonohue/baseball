let awayLineup = [];

let homeLineup = [];

const addDataToTbody = (nodeList, players) => {
  players.forEach((player, i) => {
    const tr = nodeList.insertRow(i);
    Object.keys(player).forEach((key, j) => {
      const cell = tr.insertCell(j);
      cell.innerHTML = player[key];
    });
    nodeList.appendChild(tr);
  });
};

const awayLineupBody = document.querySelector('#awayTeamLineup tbody');
const homeLineupBody = document.querySelector('#homeTeamLineup tbody');

const handleSubmit = (e, team) => {
  e.preventDefault();
  // ADD PLAYER TO LINEUP AWAY TEAM
  if (team === 'away') {
    const newPlayer = Array.from(
      document.querySelectorAll('#awayTeamPlayerForm input')
    ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
    awayLineup.push(newPlayer);
    localStorage.setItem('awayLineup', JSON.stringify(awayLineup));
    console.log(newPlayer);
    const tr = awayLineupBody.insertRow(awayLineup.length - 1);
    Object.keys(newPlayer).forEach((key, j) => {
      const cell = tr.insertCell(j);
      cell.innerHTML = newPlayer[key];
    });
    awayLineupBody.appendChild(tr);
  } else {
    // ADD PLAYER TO LINEUP HOME TEAM
    const newPlayer = Array.from(
      document.querySelectorAll('#homeTeamPlayerForm input')
    ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});

    homeLineup.push(newPlayer);
    localStorage.setItem('homeLineup', JSON.stringify(homeLineup));
    console.log(homeLineup);
    const tr = homeLineupBody.insertRow(homeLineup.length - 1);
    Object.keys(newPlayer).forEach((key, j) => {
      const cell = tr.insertCell(j);
      cell.innerHTML = newPlayer[key];
    });
    homeLineupBody.appendChild(tr);
  }
};

const awayForm = document.getElementById('awayTeamPlayerForm');
const awayFormClass = document.querySelector('.form-container-away');
const homeFormClass = document.querySelector('.form-container-home');
const homeForm = document.getElementById('homeTeamPlayerForm');
const addPlayerBtns = document.querySelectorAll('.add-player');
const clearBtns = document.querySelectorAll('.clear-team');

awayForm.addEventListener('submit', (e) => handleSubmit(e, 'away'), true);
homeForm.addEventListener('submit', (e) => handleSubmit(e, 'home'), true);

clearBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('away-team')) {
      localStorage.removeItem('awayLineup');
      awayLineupBody.innerHTML = '';
      console.log(awayLineupBody);
    } else {
      localStorage.removeItem('homeLineup');
      homeLineupBody.innerHTML = '';
    }
  });
});

// messy?
addPlayerBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('away-team')) {
      if (awayFormClass.classList.contains('show-form')) {
        awayFormClass.classList.remove('show-form');
        btn.textContent = 'Add Player';
      } else {
        awayFormClass.classList.add('show-form');
        btn.textContent = 'Hide Form';
      }
    } else {
      if (homeFormClass.classList.contains('show-form')) {
        homeFormClass.classList.remove('show-form');
        btn.textContent = 'Add Player';
      } else {
        homeFormClass.classList.add('show-form');
        btn.textContent = 'Hide Form';
      }
    }
  });
});

const getLocalStorage = () => {
  return [
    localStorage.getItem('awayLineup')
      ? JSON.parse(localStorage.getItem('awayLineup'))
      : [],
    localStorage.getItem('homeLineup')
      ? JSON.parse(localStorage.getItem('homeLineup'))
      : [],
  ];
};

window.addEventListener('DOMContentLoaded', () => {
  const local = getLocalStorage();
  awayLineup = local[0];
  homeLineup = local[1];

  addDataToTbody(awayLineupBody, awayLineup);
  addDataToTbody(homeLineupBody, homeLineup);
});

// const awayForm = document.querySelector('.form-container-away');

// const homeForm = document.querySelector('.form-container-home');

addDataToTbody(awayLineupBody, awayLineup);
addDataToTbody(homeLineupBody, homeLineup);
