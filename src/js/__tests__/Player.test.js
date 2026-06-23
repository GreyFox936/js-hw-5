import Player from '../players/Player';
import Warrior from '../players/Warrior';
import Archer from '../players/Archer';
import Mage from '../players/Mage';
import Dwarf from '../players/Dwarf';
import Crossbowman from '../players/Crossbowman';
import Demiurge from '../players/Demiurge';
import Arm from '../weapons/Arm';
import Sword from '../weapons/Sword';
import Bow from '../weapons/Bow';
import Staff from '../weapons/Staff';
import Axe from '../weapons/Axe';
import LongBow from '../weapons/LongBow';
import StormStaff from '../weapons/StormStaff';
import Knife from '../weapons/Knife';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Player', () => {
  test('creates base player with correct properties', () => {
    const player = new Player(10, 'Бэтмен');

    expect(player.life).toBe(100);
    expect(player.magic).toBe(20);
    expect(player.speed).toBe(1);
    expect(player.attack).toBe(10);
    expect(player.agility).toBe(5);
    expect(player.luck).toBe(10);
    expect(player.description).toBe('Игрок');
    expect(player.weapon).toBeInstanceOf(Arm);
    expect(player.position).toBe(10);
    expect(player.name).toBe('Бэтмен');
  });

  test('calculates luck coefficient', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const player = new Player(10, 'Бэтмен');

    expect(player.getLuck()).toBe(0.6);
  });

  test('calculates damage inside weapon range', () => {
    const player = new Player(10, 'Бэтмен');

    player.getLuck = jest.fn(() => 1);

    expect(player.getDamage(1)).toBe(11);
  });

  test('returns zero damage outside weapon range', () => {
    const player = new Player(10, 'Бэтмен');

    expect(player.getDamage(2)).toBe(0);
  });

  test('decreases life after damage', () => {
    const player = new Player(10, 'Бэтмен');

    player.takeDamage(30);

    expect(player.life).toBe(70);
  });

  test('does not decrease life below zero', () => {
    const player = new Player(10, 'Бэтмен');

    player.takeDamage(300);

    expect(player.life).toBe(0);
    expect(player.isDead()).toBe(true);
  });
});

describe('Basic player classes', () => {
  test('creates warrior with correct properties', () => {
    const warrior = new Warrior(10, 'Карлах');

    expect(warrior).toBeInstanceOf(Player);
    expect(warrior.life).toBe(120);
    expect(warrior.magic).toBe(20);
    expect(warrior.speed).toBe(2);
    expect(warrior.attack).toBe(10);
    expect(warrior.agility).toBe(5);
    expect(warrior.luck).toBe(10);
    expect(warrior.description).toBe('Воин');
    expect(warrior.weapon).toBeInstanceOf(Sword);
  });

  test('creates archer with correct properties', () => {
    const archer = new Archer(10, 'Леголас');

    expect(archer).toBeInstanceOf(Player);
    expect(archer.life).toBe(80);
    expect(archer.magic).toBe(35);
    expect(archer.speed).toBe(1);
    expect(archer.attack).toBe(5);
    expect(archer.agility).toBe(10);
    expect(archer.luck).toBe(10);
    expect(archer.description).toBe('Лучник');
    expect(archer.weapon).toBeInstanceOf(Bow);
  });

  test('creates mage with correct properties', () => {
    const mage = new Mage(10, 'Пендальф');

    expect(mage).toBeInstanceOf(Player);
    expect(mage.life).toBe(70);
    expect(mage.magic).toBe(100);
    expect(mage.speed).toBe(1);
    expect(mage.attack).toBe(5);
    expect(mage.agility).toBe(8);
    expect(mage.luck).toBe(10);
    expect(mage.description).toBe('Маг');
    expect(mage.weapon).toBeInstanceOf(Staff);
  });
});

describe('Improved player classes', () => {
  test('creates dwarf with correct properties', () => {
    const dwarf = new Dwarf(10, 'Гимли');

    expect(dwarf).toBeInstanceOf(Warrior);
    expect(dwarf.life).toBe(130);
    expect(dwarf.attack).toBe(15);
    expect(dwarf.luck).toBe(20);
    expect(dwarf.description).toBe('Гном');
    expect(dwarf.weapon).toBeInstanceOf(Axe);
  });

  test('creates crossbowman with correct properties', () => {
    const crossbowman = new Crossbowman(10, 'Ван Хельсинг');

    expect(crossbowman).toBeInstanceOf(Archer);
    expect(crossbowman.life).toBe(85);
    expect(crossbowman.attack).toBe(8);
    expect(crossbowman.agility).toBe(20);
    expect(crossbowman.luck).toBe(15);
    expect(crossbowman.description).toBe('Арбалетчик');
    expect(crossbowman.weapon).toBeInstanceOf(LongBow);
  });

  test('creates demiurge with correct properties', () => {
    const demiurge = new Demiurge(10, 'Создатель');

    expect(demiurge).toBeInstanceOf(Mage);
    expect(demiurge.life).toBe(80);
    expect(demiurge.magic).toBe(120);
    expect(demiurge.attack).toBe(6);
    expect(demiurge.luck).toBe(12);
    expect(demiurge.description).toBe('Демиург');
    expect(demiurge.weapon).toBeInstanceOf(StormStaff);
  });
});

describe('Special class behavior', () => {
  test('archer uses special damage formula', () => {
    const archer = new Archer(10, 'Леголас');

    archer.getLuck = jest.fn(() => 1);

    expect(archer.getDamage(3)).toBe(15);
    expect(archer.getDamage(4)).toBe(0);
  });

  test('warrior can spend magic instead of life when lucky and wounded', () => {
    const warrior = new Warrior(10, 'Карлах');

    warrior.life = 50;
    warrior.getLuck = jest.fn(() => 1);

    warrior.takeDamage(5);

    expect(warrior.life).toBe(50);
    expect(warrior.magic).toBe(15);
  });

  test('warrior loses life when not lucky', () => {
    const warrior = new Warrior(10, 'Карлах');

    warrior.life = 50;
    warrior.getLuck = jest.fn(() => 0);

    warrior.takeDamage(5);

    expect(warrior.life).toBe(45);
    expect(warrior.magic).toBe(20);
  });

  test('mage takes half damage while magic is above half', () => {
    const mage = new Mage(10, 'Пендальф');

    mage.takeDamage(50);

    expect(mage.life).toBe(45);
    expect(mage.magic).toBe(88);
  });

  test('mage takes full damage when magic is not above half', () => {
    const mage = new Mage(10, 'Пендальф');

    mage.magic = 50;
    mage.takeDamage(20);

    expect(mage.life).toBe(50);
    expect(mage.magic).toBe(50);
  });

  test('dwarf takes half damage on every sixth hit when lucky', () => {
    const dwarf = new Dwarf(10, 'Гимли');

    dwarf.getLuck = jest.fn(() => 1);

    [1, 2, 3, 4, 5].forEach(() => {
      dwarf.takeDamage(1);
    });

    dwarf.takeDamage(20);

    expect(dwarf.life).toBe(115);
  });

  test('demiurge increases damage when magic is available and luck is high', () => {
    const demiurge = new Demiurge(10, 'Создатель');

    demiurge.getLuck = jest.fn(() => 1);

    expect(demiurge.getDamage(1)).toBe(24);
  });

  test('demiurge does not increase damage when luck is low', () => {
    const demiurge = new Demiurge(10, 'Создатель');

    demiurge.getLuck = jest.fn(() => 0.5);

    expect(demiurge.getDamage(1)).toBe(8);
  });

  test('demiurge does not increase damage when magic is zero', () => {
    const demiurge = new Demiurge(10, 'Создатель');

    demiurge.magic = 0;
    demiurge.getLuck = jest.fn(() => 1);

    expect(demiurge.getDamage(1)).toBe(16);
  });
});

describe('Player Movement', () => {
  test('moves left no more than speed value', () => {
    const player = new Player(10, 'Бэтмен');

    player.moveLeft(5);

    expect(player.position).toBe(9);
  });

  test('moves right no more than speed value', () => {
    const player = new Player(10, 'Бэтмен');

    player.moveRight(5);

    expect(player.position).toBe(11);
  });

  test('moves left with negative distance using move method', () => {
    const player = new Player(10, 'Бэтмен');

    player.move(-5);

    expect(player.position).toBe(9);
  });

  test('moves right with positive distance using move method', () => {
    const player = new Player(10, 'Бэтмен');

    player.move(5);

    expect(player.position).toBe(11);
  });

  test('moves according to inherited class speed', () => {
    const warrior = new Warrior(6, 'Карлах');

    warrior.moveLeft(5);
    expect(warrior.position).toBe(4);

    warrior.moveRight(2);
    expect(warrior.position).toBe(6);

    warrior.moveRight(1);
    expect(warrior.position).toBe(7);
  });
});

describe('Player defense', () => {
  test('blocks attack when luck is higher than block threshold', () => {
    const player = new Player(10, 'Бэтмен');

    player.getLuck = jest.fn(() => 1);

    expect(player.isAttackBlocked()).toBe(true);
  });

  test('does not block attack when luck is lower than block threshold', () => {
    const player = new Player(10, 'Бэтмен');

    player.getLuck = jest.fn(() => 0.5);

    expect(player.isAttackBlocked()).toBe(false);
  });

  test('dodges attack when luck is higher than dodge threshold', () => {
    const player = new Player(10, 'Бэтмен');

    player.getLuck = jest.fn(() => 1);

    expect(player.dodged()).toBe(true);
  });

  test('does not dodge attack when luck is lower than dodge threshold', () => {
    const player = new Player(10, 'Бэтмен');

    player.getLuck = jest.fn(() => 0.5);

    expect(player.dodged()).toBe(false);
  });

  test('damages weapon instead of life when attack is blocked', () => {
    const player = new Warrior(10, 'Карлах');

    player.isAttackBlocked = jest.fn(() => true);
    player.dodged = jest.fn(() => true);

    player.takeAttack(20);

    expect(player.life).toBe(120);
    expect(player.weapon.durability).toBe(480);
    expect(player.dodged).not.toHaveBeenCalled();
  });

  test('does not damage life when attack is dodged', () => {
    const player = new Player(10, 'Бэтмен');

    player.isAttackBlocked = jest.fn(() => false);
    player.dodged = jest.fn(() => true);

    player.takeAttack(20);

    expect(player.life).toBe(100);
  });

  test('damages life when attack is not blocked or dodged', () => {
    const player = new Player(10, 'Бэтмен');

    player.isAttackBlocked = jest.fn(() => false);
    player.dodged = jest.fn(() => false);

    player.takeAttack(20);

    expect(player.life).toBe(80);
  });
});

describe('Weapon management', () => {
  function breakCurrentWeapon(player) {
    player.weapon.takeDamage(player.weapon.durability);
  }

  function expectWeaponChain(player, PrimaryWeaponClass) {
    expect(player.weapon).toBeInstanceOf(PrimaryWeaponClass);

    breakCurrentWeapon(player);
    player.checkWeapon();

    expect(player.weapon).toBeInstanceOf(Knife);

    breakCurrentWeapon(player);
    player.checkWeapon();

    expect(player.weapon).toBeInstanceOf(Arm);
  }

  test('does not change weapon if current weapon is not broken', () => {
    const warrior = new Warrior(10, 'Карлах');
    const currentWeapon = warrior.weapon;

    warrior.checkWeapon();

    expect(warrior.weapon).toBe(currentWeapon);
  });

  test('changes warrior weapon by chain Sword -> Knife -> Arm', () => {
    const warrior = new Warrior(10, 'Карлах');

    expectWeaponChain(warrior, Sword);
  });

  test('changes archer weapon by chain Bow -> Knife -> Arm', () => {
    const archer = new Archer(10, 'Леголас');

    expectWeaponChain(archer, Bow);
  });

  test('changes mage weapon by chain Staff -> Knife -> Arm', () => {
    const mage = new Mage(10, 'Пендальф');

    expectWeaponChain(mage, Staff);
  });

  test('changes dwarf weapon by chain Axe -> Knife -> Arm', () => {
    const dwarf = new Dwarf(10, 'Гимли');

    expectWeaponChain(dwarf, Axe);
  });

  test('changes crossbowman weapon by chain LongBow -> Knife -> Arm', () => {
    const crossbowman = new Crossbowman(10, 'Ван Хельсинг');

    expectWeaponChain(crossbowman, LongBow);
  });

  test('changes demiurge weapon by chain StormStaff -> Knife -> Arm', () => {
    const demiurge = new Demiurge(10, 'Создатель');

    expectWeaponChain(demiurge, StormStaff);
  });

  test('does not change weapon when broken weapon has no next weapon class', () => {
    const player = new Player(10, 'Бэтмен');
    const currentWeapon = player.weapon;

    player.weapon.isBroken = jest.fn(() => true);

    player.checkWeapon();

    expect(player.weapon).toBe(currentWeapon);
  });
});

describe('Player attack', () => {
  test('does not attack enemy outside weapon range', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(2, 'Леголас');

    archer.takeAttack = jest.fn();
    warrior.getLuck = jest.fn(() => 1);

    warrior.tryAttack(archer);

    expect(archer.takeAttack).not.toHaveBeenCalled();
    expect(warrior.weapon.durability).toBe(500);
  });

  test('attacks enemy inside weapon range', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(1, 'Леголас');

    archer.takeAttack = jest.fn();
    warrior.getLuck = jest.fn(() => 1);

    warrior.tryAttack(archer);

    expect(warrior.weapon.durability).toBe(490);
    expect(archer.takeAttack).toHaveBeenCalledWith(35);
  });

  test('pushes enemy right and deals double damage when positions are equal', () => {
    const warrior = new Warrior(1, 'Карлах');
    const archer = new Archer(1, 'Леголас');

    archer.takeAttack = jest.fn();
    warrior.getLuck = jest.fn(() => 1);

    warrior.tryAttack(archer);

    expect(archer.position).toBe(2);
    expect(archer.takeAttack).toHaveBeenCalledWith(70);
  });

  test('changes weapon after attack if current weapon is broken', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(1, 'Леголас');

    archer.takeAttack = jest.fn();
    warrior.getLuck = jest.fn(() => 1);
    warrior.weapon.durability = 5;

    warrior.tryAttack(archer);

    expect(warrior.weapon).toBeInstanceOf(Knife);
  });
});

describe('Player choose enemy turn', () => {
  test('chooses alive enemy with minimal life', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(5, 'Леголас');
    const mage = new Mage(10, 'Пендальф');
    const dwarf = new Dwarf(15, 'Гимли');

    archer.life = 30;
    mage.life = 10;
    dwarf.life = 0;

    expect(warrior.chooseEnemy([warrior, archer, mage, dwarf])).toBe(mage);
  });

  test('returns null when there are no available enemies', () => {
    const warrior = new Warrior(0, 'Карлах');

    expect(warrior.chooseEnemy([warrior])).toBe(null);
  });

  test('moves right toward enemy', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(5, 'Леголас');

    warrior.moveToEnemy(archer);

    expect(warrior.position).toBe(2);
  });

  test('moves left toward enemy', () => {
    const warrior = new Warrior(5, 'Карлах');
    const archer = new Archer(0, 'Леголас');

    warrior.moveToEnemy(archer);

    expect(warrior.position).toBe(3);
  });

  test('turn chooses enemy, moves to enemy, and attacks', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(5, 'Леголас');
    const mage = new Mage(10, 'Пендальф');

    archer.life = 30;
    mage.life = 10;
    warrior.tryAttack = jest.fn();

    warrior.turn([warrior, archer, mage]);

    expect(warrior.position).toBe(2);
    expect(warrior.tryAttack).toHaveBeenCalledWith(mage);
  });

  test('dead player does not make a turn', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(5, 'Леголас');

    warrior.life = 0;
    warrior.tryAttack = jest.fn();

    warrior.turn([warrior, archer]);

    expect(warrior.position).toBe(0);
    expect(warrior.tryAttack).not.toHaveBeenCalled();
  });

  test('player does not make a turn when there are no enemies', () => {
    const warrior = new Warrior(0, 'Карлах');

    warrior.tryAttack = jest.fn();

    warrior.turn([warrior]);

    expect(warrior.position).toBe(0);
    expect(warrior.tryAttack).not.toHaveBeenCalled();
  });

  test('keeps current weakest enemy when next enemy has more life', () => {
    const warrior = new Warrior(0, 'Карлах');
    const archer = new Archer(5, 'Леголас');
    const mage = new Mage(10, 'Пендальф');

    archer.life = 10;
    mage.life = 30;

    expect(warrior.chooseEnemy([warrior, archer, mage])).toBe(archer);
  });
});
