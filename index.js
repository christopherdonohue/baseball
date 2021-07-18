const dodgersLineup = [
  {
    player: 'Cody Bellinger',
    jerseyNumber: 35,
    positionPlayed: 'CF',
    battingAverage: '.173',
  },
  {
    player: 'Max Muncy',
    jerseyNumber: 13,
    positionPlayed: '1B',
    battingAverage: '.278',
  },
  {
    player: 'Justin Turner',
    jerseyNumber: 10,
    positionPlayed: '3B',
    battingAverage: '.303',
  },
  {
    player: 'Will Smith',
    jerseyNumber: 16,
    positionPlayed: 'C',
    battingAverage: '.256',
  },
  {
    player: 'Chris Taylor',
    jerseyNumber: 3,
    positionPlayed: '2B',
    battingAverage: '.272',
  },
  {
    player: 'Zack McKinstry',
    jerseyNumber: 8,
    positionPlayed: 'RF',
    battingAverage: '.248',
  },
  {
    player: 'AJ Pollock',
    jerseyNumber: 11,
    positionPlayed: 'LF',
    battingAverage: '.275',
  },
  {
    player: 'Gavin Lux',
    jerseyNumber: 9,
    positionPlayed: 'SS',
    battingAverage: '.230',
  },
  {
    player: 'David Price',
    jerseyNumber: 33,
    positionPlayed: 'P',
    battingAverage: '.000',
  },
];

const rockiesLineup = [
  {
    player: 'Garrett Hampson',
    jerseyNumber: 11,
    positionPlayed: 'CF',
    battingAverage: '.249',
  },
  {
    player: 'Brendan Rodgers',
    jerseyNumber: 7,
    positionPlayed: '2B',
    battingAverage: '.268',
  },
  {
    player: 'Trevor Story',
    jerseyNumber: 27,
    positionPlayed: 'SS',
    battingAverage: '.246',
  },
  {
    player: 'Charlie Blackmon',
    jerseyNumber: 19,
    positionPlayed: 'RF',
    battingAverage: '.266',
  },
  {
    player: 'CJ Cron',
    jerseyNumber: 25,
    positionPlayed: '1B',
    battingAverage: '.251',
  },
  {
    player: 'Ryan McMahon',
    jerseyNumber: 24,
    positionPlayed: '2B',
    battingAverage: '.253',
  },
  {
    player: 'Elias Diaz',
    jerseyNumber: 35,
    positionPlayed: 'C',
    battingAverage: '.209',
  },
  {
    player: 'Chris Owings',
    jerseyNumber: 12,
    positionPlayed: 'LF',
    battingAverage: '.300',
  },
  {
    player: 'Jon Gray',
    jerseyNumber: 55,
    positionPlayed: 'P',
    battingAverage: '.143',
  },
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

// Add player to lineup
const handleSubmit = (e) => {
  e.preventDefault();

  const newPlayer = Array.from(
    document.querySelectorAll('#playerForm input')
  ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});

  dodgersLineup.push(newPlayer);
  const tr = dodgersLineupBody.insertRow(dodgersLineup.length - 1);
  Object.keys(newPlayer).forEach((key, j) => {
    const cell = tr.insertCell(j);
    cell.innerHTML = newPlayer[key];
  });
  dodgersLineupBody.appendChild(tr);
};
let form = document.getElementById('playerForm');
form.addEventListener('submit', handleSubmit, true);

const dodgersLineupBody = document.querySelector('#dodgersLineup tbody');
const rockiesLineupBody = document.querySelector('#rockiesLineup');
const dodgersForm = document.querySelector('.form-container');

addDataToTbody(dodgersLineupBody, dodgersLineup);
addDataToTbody(rockiesLineupBody, rockiesLineup);
