const awayLineup = [
  // {
  //   player: 'Cody Bellinger',
  //   jerseyNumber: 35,
  //   positionPlayed: 'CF',
  //   battingAverage: '.173',
  // },
  // {
  //   player: 'Max Muncy',
  //   jerseyNumber: 13,
  //   positionPlayed: '1B',
  //   battingAverage: '.278',
  // },
  // {
  //   player: 'Justin Turner',
  //   jerseyNumber: 10,
  //   positionPlayed: '3B',
  //   battingAverage: '.303',
  // },
  // {
  //   player: 'Will Smith',
  //   jerseyNumber: 16,
  //   positionPlayed: 'C',
  //   battingAverage: '.256',
  // },
  // {
  //   player: 'Chris Taylor',
  //   jerseyNumber: 3,
  //   positionPlayed: '2B',
  //   battingAverage: '.272',
  // },
  // {
  //   player: 'Zack McKinstry',
  //   jerseyNumber: 8,
  //   positionPlayed: 'RF',
  //   battingAverage: '.248',
  // },
  // {
  //   player: 'AJ Pollock',
  //   jerseyNumber: 11,
  //   positionPlayed: 'LF',
  //   battingAverage: '.275',
  // },
  // {
  //   player: 'Gavin Lux',
  //   jerseyNumber: 9,
  //   positionPlayed: 'SS',
  //   battingAverage: '.230',
  // },
  // {
  //   player: 'David Price',
  //   jerseyNumber: 33,
  //   positionPlayed: 'P',
  //   battingAverage: '.000',
  // },
];

const homeLineup = [
  // {
  //   player: 'Garrett Hampson',
  //   jerseyNumber: 11,
  //   positionPlayed: 'CF',
  //   battingAverage: '.249',
  // },
  // {
  //   player: 'Brendan Rodgers',
  //   jerseyNumber: 7,
  //   positionPlayed: '2B',
  //   battingAverage: '.268',
  // },
  // {
  //   player: 'Trevor Story',
  //   jerseyNumber: 27,
  //   positionPlayed: 'SS',
  //   battingAverage: '.246',
  // },
  // {
  //   player: 'Charlie Blackmon',
  //   jerseyNumber: 19,
  //   positionPlayed: 'RF',
  //   battingAverage: '.266',
  // },
  // {
  //   player: 'CJ Cron',
  //   jerseyNumber: 25,
  //   positionPlayed: '1B',
  //   battingAverage: '.251',
  // },
  // {
  //   player: 'Ryan McMahon',
  //   jerseyNumber: 24,
  //   positionPlayed: '2B',
  //   battingAverage: '.253',
  // },
  // {
  //   player: 'Elias Diaz',
  //   jerseyNumber: 35,
  //   positionPlayed: 'C',
  //   battingAverage: '.209',
  // },
  // {
  //   player: 'Chris Owings',
  //   jerseyNumber: 12,
  //   positionPlayed: 'LF',
  //   battingAverage: '.300',
  // },
  // {
  //   player: 'Jon Gray',
  //   jerseyNumber: 55,
  //   positionPlayed: 'P',
  //   battingAverage: '.143',
  // },
];

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
