const awayLineup = [];

const homeLineup = [];

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

const handleSubmit = (e, team) => {
  e.preventDefault();
  // ADD PLAYER TO LINEUP AWAY TEAM
  if (team === 'away') {
    const newPlayer = Array.from(
      document.querySelectorAll('#awayTeamPlayerForm input')
    ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});

    awayLineup.push(newPlayer);
    console.log(awayLineup);
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
const homeForm = document.getElementById('homeTeamPlayerForm');
awayForm.addEventListener('submit', (e) => handleSubmit(e, 'away'), true);
homeForm.addEventListener('submit', (e) => handleSubmit(e, 'home'), true);

const awayLineupBody = document.querySelector('#awayTeamLineup tbody');
const homeLineupBody = document.querySelector('#homeTeamLineup tbody');
// const awayForm = document.querySelector('.form-container-away');

// const homeForm = document.querySelector('.form-container-home');

addDataToTbody(awayLineupBody, awayLineup);
addDataToTbody(homeLineupBody, homeLineup);
