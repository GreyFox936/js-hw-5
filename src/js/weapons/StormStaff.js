import Staff from './Staff';

export default class StormStaff extends Staff {
  constructor(
    name = 'Посох Бури',
    attack = 10,
    durability = 300,
    range = 3,
  ) {
    super(name, attack, durability, range);
  }
}
