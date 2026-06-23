import Player from './Player';
import Staff from '../weapons/Staff';

export default class Mage extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 70;
    this.maxLife = this.life;
    this.magic = 100;
    this.maxMagic = this.magic;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';
    this.setWeapon(Staff);
  }

  takeDamage(damage) {
    if (this.magic > this.maxMagic / 2) {
      this.magic = Math.max(this.magic - 12, 0);
      super.takeDamage(damage / 2);

      return;
    }

    super.takeDamage(damage);
  }
}
