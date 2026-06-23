export default function play(players, battleLog = []) {
  let alivePlayers = players.filter((player) => !player.isDead());
  for (let index = 0; index < players.length; index += 1) {
    players[index].setBattleLog(battleLog);
  }

  battleLog.push(`Бой начинается. Участников: ${alivePlayers.length}`);

  while (alivePlayers.length > 1) {
    for (let index = 0; index < alivePlayers.length; index += 1) {
      const player = alivePlayers[index];

      if (!player.isDead()) {
        player.turn(alivePlayers);
      }
    }

    alivePlayers = players.filter((player) => !player.isDead());
  }

  const winner = alivePlayers[0] || null;

  if (winner) {
    battleLog.push(`Победитель: ${winner.description} ${winner.name}`);
  } else {
    battleLog.push('Победитель не определён');
  }

  return winner;

//  return alivePlayers[0] || null;
}
