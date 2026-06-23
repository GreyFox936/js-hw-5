import Warrior from './Warrior';
import Axe from '../weapons/Axe';

export default class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);

    this.life = 130;
    this.maxLife = this.life;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';
    this.setWeapon(Axe);
    this.hitsTaken = 0;
  }

  takeDamage(damage) {
    this.hitsTaken += 1;

    const isSixthHit = this.hitsTaken % 6 === 0;
    const isLucky = this.getLuck() > 0.5;

    if (isSixthHit && isLucky) {
      super.takeDamage(damage / 2);

      return;
    }

    super.takeDamage(damage);
  }
}
