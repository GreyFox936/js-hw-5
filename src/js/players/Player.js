import Arm from '../weapons/Arm';
import Knife from '../weapons/Knife';

// Default Stats
export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.maxLife = this.life;
    this.magic = 20;
    this.maxMagic = this.magic;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();
    this.weaponClasses = [Arm];
    this.position = position;
    this.name = name;
    this.battleLog = [];
  }

  setWeapon(WeaponClass) {
    this.weapon = new WeaponClass();
    this.weaponClasses = [
      WeaponClass,
      Knife,
      Arm,
    ];
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }

    const weaponIndex = this.weaponClasses.findIndex(
      (WeaponClass) => this.weapon instanceof WeaponClass,
    );
    const NextWeaponClass = this.weaponClasses[weaponIndex + 1];

    if (NextWeaponClass) {
      const previousWeaponName = this.weapon.name;

      this.weapon = new NextWeaponClass();
      this.log(`${this.description} ${this.name} меняет оружие: ${previousWeaponName} -> ${this.weapon.name}`);
    }
  }

  setBattleLog(battleLog) {
    this.battleLog = battleLog;
  }

  log(message) {
    this.battleLog.push(message);
  }

  getLuck() {
    const randomNumber = Math.random() * 100;

    return (randomNumber + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      this.log(`${this.weapon.name} не достаёт до цели`);

      return 0;
    }

    const weaponDamage = this.weapon.getDamage();
    const baseDamage = this.attack + weaponDamage;
    const luck = this.getLuck();
    const damage = baseDamage * luck;
    this.log(`${this.description} ${this.name} наносит удар с силой ${damage.toFixed(2)}`);

    return damage / distance;
  }

  takeDamage(damage) {
    const previousLife = this.life;

    this.life = Math.max(this.life - damage, 0);

    this.log(`${this.description} ${this.name} получает урон ${damage.toFixed(2)}. Текущие хиты: ${previousLife.toFixed(2)} -> ${this.life.toFixed(2)}`);
  }

  // Movement Block

  moveLeft(distance) {
    const previousPosition = this.position;
    const moveDistance = Math.min(Math.abs(distance), this.speed);

    this.position -= moveDistance;

    if (this.position !== previousPosition) {
      this.log(`${this.description} ${this.name} двигается влево: ${previousPosition} -> ${this.position}`);
    }
  }

  moveRight(distance) {
    const moveDistance = Math.min(Math.abs(distance), this.speed);

    this.position += moveDistance;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(distance);

      return;
    }

    this.moveRight(distance);
  }

  // Attacks Block

  isAttackBlocked() {
    const blockThreshold = (100 - this.luck) / 100;

    return this.getLuck() > blockThreshold;
  }

  dodged() {
    const dodgeValue = 100 - this.agility - (this.speed * 3);
    const dodgeThreshold = dodgeValue / 100;

    return this.getLuck() > dodgeThreshold;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      this.log(`${this.description} ${this.name} блокирует удар. ${this.weapon.name} теряет ${damage.toFixed(2)} прочности`);

      return;
    }

    if (this.dodged()) {
      this.log(`${this.description} ${this.name} уклоняется!`);

      return;
    }

    this.takeDamage(damage);
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);
    this.log(`${this.description} ${this.name} атакует ${enemy.description} ${enemy.name}. Дистанция: ${distance}`);

    if (distance > this.weapon.range) {
      return;
    }

    const weaponDamage = 10 * this.getLuck();

    this.weapon.takeDamage(weaponDamage);

    const damageDistance = Math.max(distance, 1);
    const damage = this.getDamage(damageDistance);

    if (this.position === enemy.position) {
      this.log(`${enemy.description} ${enemy.name} отлетает вправо и получает удвоенный урон`);
      enemy.moveRight(1);
      enemy.takeAttack(damage * 2);
    } else {
      enemy.takeAttack(damage);
    }

    this.checkWeapon();
  }

  chooseEnemy(players) {
    const enemies = players.filter((player) => player !== this && !player.isDead());

    if (enemies.length === 0) {
      return null;
    }

    return enemies.reduce((weakestEnemy, enemy) => {
      if (enemy.life < weakestEnemy.life) {
        return enemy;
      }

      return weakestEnemy;
    });
  }

  moveToEnemy(enemy) {
    const distance = enemy.position - this.position;

    this.move(distance);
  }

  turn(players) {
    if (this.isDead()) {
      return;
    }

    this.log(`Ход: ${this.description} ${this.name}`);

    const enemy = this.chooseEnemy(players);

    if (!enemy) {
      return;
    }

    this.log(`${this.description} ${this.name} выбирает цель: ${enemy.description} ${enemy.name}`);

    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }

  isDead() {
    return this.life === 0;
  }
}
