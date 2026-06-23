import Player from './Player';
import Bow from '../weapons/Bow';

export default class Archer extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 80;
    this.maxLife = this.life;
    this.magic = 35;
    this.maxMagic = this.magic;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.setWeapon(Bow);
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }

    const weaponDamage = this.weapon.getDamage();
    const baseDamage = this.attack + weaponDamage;
    const luck = this.getLuck();
    const distanceModifier = distance / this.weapon.range;

    return baseDamage * luck * distanceModifier;
  }
}
