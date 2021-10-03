let awayLineup = [];

let homeLineup = [];

const awayLineupBody = document.querySelector('#awayTeamLineup tbody');
const homeLineupBody = document.querySelector('#homeTeamLineup tbody');
const homeTeamBattingBody = document.querySelector('#homeTeamBatting tbody');
const awayTeamBattingBody = document.querySelector('#awayTeamBatting tbody');
const homeInnings = document.querySelector('.score-rows-home');
const awayInnings = document.querySelector('.score-rows-away');

const awayForm = document.getElementById('awayTeamPlayerForm');
const awayFormClass = document.querySelector('.form-container-away');
const homeFormClass = document.querySelector('.form-container-home');
const homeForm = document.getElementById('homeTeamPlayerForm');
const addPlayerBtns = document.querySelectorAll('.add-player');
const clearBtns = document.querySelectorAll('.clear-team');
const playFormContainerHome = document.querySelector(
  '.play-form-container-home'
);
const playFormContainerAway = document.querySelector(
  '.play-form-container-away'
);
const playFormHome = document.querySelector('.play-form-home');
const playFormAway = document.querySelector('.play-form-away');
// THE EVIL GLOBAL VAR CUZ BAD DEV
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

const makeCellsClickable = (e, cell, team, lineup) => {
  const inning = e.currentTarget.classList[1];

  // first cell in each row with player and stats.
  const td = e.currentTarget.parentElement.firstChild.className;
  if (lineup === 'home') {
    homeTeamBattingBody.childNodes.forEach((row) => {
      row.childNodes.forEach((item) => {
        // makes sure multiple at-bats are not edited
        if (
          item.classList[1] !== inning ||
          row.childNodes[0].className !== td
        ) {
          item.classList.remove('edit');
        }
      });
    });

    cell.classList.add('edit');
    playFormContainerHome.classList.add('show-play-form-home');
    //listen for submit after at-bat edit

    playFormHome.addEventListener('submit', (e) => {
      e.preventDefault();
      // only clicked cell gets edited
      if (cell.classList.contains('edit')) {
        cell.innerHTML = e.target[0].value;
        localStorage.setItem(
          'homeAtBats',
          JSON.stringify(homeTeamBattingBody.innerHTML)
        );
      }
      cell.classList.remove('edit');
      playFormContainerHome.classList.remove('show-play-form-home');
    });
  } else {
    console.log('hello');
    awayTeamBattingBody.childNodes.forEach((row) => {
      row.childNodes.forEach((item) => {
        // makes sure multiple at-bats are not edited
        if (
          item.classList[1] !== inning ||
          row.childNodes[0].className !== td
        ) {
          item.classList.remove('edit');
        }
      });
    });
    cell.classList.add('edit');
    playFormContainerAway.classList.add('show-play-form-away');
    playFormAway.addEventListener('submit', (e) => {
      e.preventDefault();
      // only clicked cell gets edited
      if (cell.classList.contains('edit')) {
        cell.innerHTML = e.target[0].value;
        localStorage.setItem(
          'awayAtBats',
          JSON.stringify(awayTeamBattingBody.innerHTML)
        );
      }
      cell.classList.remove('edit');
      playFormContainerAway.classList.remove('show-play-form-away');
    });
  }
};

const addBlankCellsForBattingScore = (tr, team, players, lineup) => {
  for (let i = 1; i < team.children.length; i++) {
    let cell = tr.insertCell(i);
    cell.classList.add('inning');
    cell.classList.add(`${i}`);

    // listen for click to edit at-bat
    cell.addEventListener('click', (e) =>
      makeCellsClickable(e, cell, team, lineup)
    );
  }
};

const addBattersToTBody = (
  team,
  nodeList,
  innings,
  players,
  atBats,
  battingBody
) => {
  let tr;
  // this adds click events to cells if at-bats are pulled from local storage
  if (atBats) {
    battingBody.innerHTML = atBats;
    battingBody.childNodes.forEach((row) => {
      row.childNodes.forEach((item) => {
        item.addEventListener('click', (e) =>
          makeCellsClickable(e, item, team)
        );
      });
    });
  } else {
    players.forEach((player, i) => {
      tr = nodeList.insertRow(i);
      // class can't have whitespace
      let short = player.player.replace(' ', '');
      let cell = tr.insertCell(0);
      cell.classList.add(short);
      Object.keys(player).forEach((key, j) => {
        cell.innerHTML += player[key] + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
      });
      nodeList.appendChild(tr);
    });

    addBlankCellsForBattingScore(tr, innings, players);
  }
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
      const tr = awayLineupBody.insertRow(awayLineup.length - 1);
      Object.keys(newPlayer).forEach((key, j) => {
        const cell = tr.insertCell(j);
        cell.innerHTML = newPlayer[key];
      });
      awayLineupBody.appendChild(tr);
      const tr2 = awayTeamBattingBody.insertRow(awayLineup.length - 1);
      let cell2 = tr2.insertCell(0);
      tr.childNodes.forEach((node) => {
        cell2.innerHTML += node.innerHTML + '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
      });

      // add player name to td classlist. This helps ensure you don't edit two player's at-bats at the same time.
      const playerNameForClass = newPlayer.player.replace(' ', '');
      cell2.classList.add(playerNameForClass);
      addBlankCellsForBattingScore(tr2, awayInnings, awayLineup, 'away');
    }
  } else {
    if (homeForm.classList.contains('edit')) {
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
      addBlankCellsForBattingScore(tr2, homeInnings, homeLineup, 'home');
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
    localStorage.getItem('homeAtBats')
      ? JSON.parse(localStorage.getItem('homeAtBats'))
      : [],
    localStorage.getItem('awayAtBats')
      ? JSON.parse(localStorage.getItem('awayAtBats'))
      : [],
  ];
};

window.addEventListener('DOMContentLoaded', () => {
  const local = getLocalStorage();
  awayLineup = local[0];
  homeLineup = local[1];
  homeAtBats = local[2];
  awayAtBats = local[3];

  addDataToTbody(awayLineupBody, awayLineup);
  addDataToTbody(homeLineupBody, homeLineup);
  addBattersToTBody(
    'home',
    homeTeamBattingBody,
    homeInnings,
    homeLineup,
    homeAtBats,
    homeTeamBattingBody
  );
  addBattersToTBody(
    'away',
    awayTeamBattingBody,
    awayInnings,
    awayLineup,
    awayAtBats,
    awayTeamBattingBody
  );
  grantAbilityToEdit();
});
