import Mage from './Mage';
import StormStaff from '../weapons/StormStaff';

export default class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);

    this.life = 80;
    this.maxLife = this.life;
    this.magic = 120;
    this.maxMagic = this.magic;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';
    this.setWeapon(StormStaff);
  }

  getDamage(distance) {
    const damage = super.getDamage(distance);
    const canUseMagic = this.magic > 0;
    const isLucky = this.getLuck() > 0.6;

    if (canUseMagic && isLucky) {
      return damage * 1.5;
    }
    return damage;
  }
}
