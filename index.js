let awayLineup = [];

let homeLineup = [];

const awayLineupBody = document.querySelector('#awayTeamLineup tbody');
const homeLineupBody = document.querySelector('#homeTeamLineup tbody');
const homeTeamBattingBody = document.querySelector('#homeTeamBatting tbody');
const homeInnings = document.querySelector('.score-rows');

const awayForm = document.getElementById('awayTeamPlayerForm');
const awayFormClass = document.querySelector('.form-container-away');
const homeFormClass = document.querySelector('.form-container-home');
const homeForm = document.getElementById('homeTeamPlayerForm');
const addPlayerBtns = document.querySelectorAll('.add-player');
const clearBtns = document.querySelectorAll('.clear-team');
const playFormContainer = document.querySelector('.play-form-container');
const playFormHome = document.querySelector('.play-form-home');

let globalIndex;

const grantAbilityToEdit = () => {
  awayLineupBody.childNodes.forEach((child, index) => {
    child.addEventListener('click', (e) => {
      globalIndex = index;
      awayForm.classList.toggle('show-form');
      awayForm.classList.toggle('edit');
    });
  });
  homeLineupBody.childNodes.forEach((child, index) => {
    child.addEventListener('click', () => {
      globalIndex = index;
      homeForm.classList.toggle('show-form');
      homeForm.classList.toggle('edit');
    });
  });
};

const addBlankCellsForBattingScore = (tr, team, lineup) => {
  for (let i = 1; i < team.children.length; i++) {
    let cell = tr.insertCell(i);
    cell.classList.add('inning');
    cell.classList.add(`${i}`);

    // listen for click to edit at-bat
    cell.addEventListener('click', (e) => {
      const inning = e.currentTarget.classList[1];
      homeTeamBattingBody.childNodes.forEach((row) => {
        row.childNodes.forEach((item) => {
          if (item.classList[1] !== inning) {
            item.classList.remove('edit');
          }
          if (item.className === '') {
            console.log(item.innerText);
          }
        });
      });

      cell.classList.add('edit');
      playFormContainer.classList.add('show-play-form');
      //listen for submit after at-bat edit
      playFormHome.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        // only clicked cell gets edited
        if (cell.classList.contains('edit')) cell.innerHTML = e.target[0].value;
        cell.classList.remove('edit');
        playFormContainer.classList.remove('show-play-form');
      });
    });
  }
};

const addBattersToTBody = (nodeList, players) => {
  let tr;
  players.forEach((player, i) => {
    tr = nodeList.insertRow(i);
    let short = player.player.replace(' ', '');
    let cell = tr.insertCell(0);
    cell.classList.add(short);
    Object.keys(player).forEach((key, j) => {
      cell.innerHTML += player[key] + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
    });
    nodeList.appendChild(tr);

    addBlankCellsForBattingScore(tr, homeInnings, homeLineup);
  });
};

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
    if (awayForm.classList.contains('edit')) {
      console.log(e.target[globalIndex].value);
      awayLineup[globalIndex].player = e.target[0].value;
      awayLineup[globalIndex].jerseyNumber = e.target[1].value;
      awayLineup[globalIndex].positionPlayed = e.target[2].value;
      awayLineup[globalIndex].battingAverage = e.target[3].value;
      Object.keys(awayLineup[globalIndex]).forEach((key, index) => {
        awayLineupBody.childNodes[globalIndex].childNodes[index].innerHTML =
          e.target[index].value;
      });
      localStorage.setItem('awayLineup', JSON.stringify(awayLineup));
    } else {
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
      tr.addEventListener('click', () => {
        console.log(tr);
      });
    }
  } else {
    if (homeForm.classList.contains('edit')) {
      console.log(e.target[globalIndex].value);
      homeLineup[globalIndex].player = e.target[0].value;
      homeLineup[globalIndex].jerseyNumber = e.target[1].value;
      homeLineup[globalIndex].positionPlayed = e.target[2].value;
      homeLineup[globalIndex].battingAverage = e.target[3].value;
      Object.keys(homeLineup[globalIndex]).forEach((key, index) => {
        homeLineupBody.childNodes[globalIndex].childNodes[index].innerHTML =
          e.target[index].value;
      });
      localStorage.setItem('homeLineup', JSON.stringify(homeLineup));
    } else {
      // ADD PLAYER TO LINEUP HOME TEAM
      const newPlayer = Array.from(
        document.querySelectorAll('#homeTeamPlayerForm input')
      ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});

      homeLineup.push(newPlayer);
      localStorage.setItem('homeLineup', JSON.stringify(homeLineup));
      const tr = homeLineupBody.insertRow(homeLineup.length - 1);
      Object.keys(newPlayer).forEach((key, j) => {
        const cell = tr.insertCell(j);
        cell.innerHTML = newPlayer[key];
      });
      homeLineupBody.appendChild(tr);
      const tr2 = homeTeamBattingBody.insertRow(homeLineup.length - 1);
      let cell2 = tr2.insertCell(0);
      tr.childNodes.forEach((node) => {
        cell2.innerHTML += node.innerHTML + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
      });

      // add player name to td classlist. This helps ensure you don't edit two player's at-bats at the same time.
      const playerNameForClass = newPlayer.player.replace(' ', '');
      cell2.classList.add(playerNameForClass);
      console.log(cell2);
      addBlankCellsForBattingScore(tr2, homeInnings, homeLineup);
    }
  }
};

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
  addBattersToTBody(homeTeamBattingBody, homeLineup);
  grantAbilityToEdit();
});
