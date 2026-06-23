import Bow from './Bow';

export default class LongBow extends Bow {
  constructor(
    name = 'Длинный лук',
    attack = 15,
    durability = 200,
    range = 4,
  ) {
    super(name, attack, durability, range);
  }
}
