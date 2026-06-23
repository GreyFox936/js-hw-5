import Player from './Player';
import Sword from '../weapons/Sword';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 120;
    this.maxLife = this.life;
    this.speed = 2;
    this.attack = 10;
    this.description = 'Воин';
    this.setWeapon(Sword);
  }

  takeDamage(damage) {
    const isLifeLow = this.life < this.maxLife / 2;
    const canUseMagic = this.magic > 0;
    const isLucky = this.getLuck() > 0.8;

    if (isLifeLow && canUseMagic && isLucky) {
      this.magic = Math.max(this.magic - damage, 0);

      return;
    }

    super.takeDamage(damage);
  }
}
