import './css/style.css';
import play from './js/game';
import Warrior from './js/players/Warrior';
import Archer from './js/players/Archer';
import Mage from './js/players/Mage';

const app = document.getElementById('app');

const players = [
  new Warrior(0, 'Карлах'),
  new Archer(3, 'Леголас'),
  new Mage(6, 'Пендальф'),
];

const battleLog = [];
const winner = play(players, battleLog);

app.textContent = winner
  ? `Победитель: ${winner.description} ${winner.name}\n\n${battleLog.join('\n')}`
  : `Победитель не определён\n\n${battleLog.join('\n')}`;
