import Weapon from './Weapon';

export default class Arm extends Weapon {
  constructor(
    name = 'Рука',
    attack = 1,
    durability = Infinity,
    range = 1,
  ) {
    super(name, attack, durability, range);
  }
}
