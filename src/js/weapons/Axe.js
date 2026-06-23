import Sword from './Sword';

export default class Axe extends Sword {
  constructor(
    name = 'Секира',
    attack = 27,
    durability = 800,
    range = 1,
  ) {
    super(name, attack, durability, range);
  }
}
