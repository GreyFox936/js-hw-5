import Weapon from '../weapons/Weapon';
import Arm from '../weapons/Arm';
import Bow from '../weapons/Bow';
import Sword from '../weapons/Sword';
import Knife from '../weapons/Knife';
import Staff from '../weapons/Staff';
import LongBow from '../weapons/LongBow';
import Axe from '../weapons/Axe';
import StormStaff from '../weapons/StormStaff';

describe('Weapon', () => {
  test('creates base weapon with correct properties', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon.name).toBe('Старый меч');
    expect(weapon.attack).toBe(20);
    expect(weapon.durability).toBe(10);
    expect(weapon.initDurability).toBe(10);
    expect(weapon.range).toBe(1);
  });

  test('decreases durability after taking damage', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    weapon.takeDamage(5);

    expect(weapon.durability).toBe(5);
  });

  test('does not decrease durability below zero', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    weapon.takeDamage(50);

    expect(weapon.durability).toBe(0);
  });

  test('returns full damage when durability is at least 30 percent', () => {
    const bow = new Bow();

    bow.takeDamage(100);

    expect(bow.getDamage()).toBe(10);
  });

  test('returns half damage when durability is less than 30 percent', () => {
    const bow = new Bow();

    bow.takeDamage(150);

    expect(bow.getDamage()).toBe(5);
  });

  test('returns zero damage when weapon is broken', () => {
    const bow = new Bow();

    bow.takeDamage(200);

    expect(bow.getDamage()).toBe(0);
  });

  test('checks broken weapon state', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon.isBroken()).toBe(false);

    weapon.takeDamage(10);

    expect(weapon.isBroken()).toBe(true);
  });
});

describe('Basic weapon classes', () => {
  test('creates arm with correct properties', () => {
    const arm = new Arm();

    expect(arm).toBeInstanceOf(Weapon);
    expect(arm.name).toBe('Рука');
    expect(arm.attack).toBe(1);
    expect(arm.durability).toBe(Infinity);
    expect(arm.initDurability).toBe(Infinity);
    expect(arm.range).toBe(1);
  });

  test('arm durability remains infinite after damage', () => {
    const arm = new Arm();

    arm.takeDamage(20);

    expect(arm.durability).toBe(Infinity);
    expect(arm.getDamage()).toBe(1);
    expect(arm.isBroken()).toBe(false);
  });

  test('creates bow with correct properties', () => {
    const bow = new Bow();

    expect(bow).toBeInstanceOf(Weapon);
    expect(bow.name).toBe('Лук');
    expect(bow.attack).toBe(10);
    expect(bow.durability).toBe(200);
    expect(bow.initDurability).toBe(200);
    expect(bow.range).toBe(3);
  });

  test('creates sword with correct properties', () => {
    const sword = new Sword();

    expect(sword).toBeInstanceOf(Weapon);
    expect(sword.name).toBe('Меч');
    expect(sword.attack).toBe(25);
    expect(sword.durability).toBe(500);
    expect(sword.initDurability).toBe(500);
    expect(sword.range).toBe(1);
  });

  test('creates knife with correct properties', () => {
    const knife = new Knife();

    expect(knife).toBeInstanceOf(Weapon);
    expect(knife.name).toBe('Нож');
    expect(knife.attack).toBe(5);
    expect(knife.durability).toBe(300);
    expect(knife.initDurability).toBe(300);
    expect(knife.range).toBe(1);
  });

  test('creates staff with correct properties', () => {
    const staff = new Staff();

    expect(staff).toBeInstanceOf(Weapon);
    expect(staff.name).toBe('Посох');
    expect(staff.attack).toBe(8);
    expect(staff.durability).toBe(300);
    expect(staff.initDurability).toBe(300);
    expect(staff.range).toBe(2);
  });
});

describe('Improved weapon classes', () => {
  test('creates long bow with correct properties', () => {
    const longBow = new LongBow();

    expect(longBow).toBeInstanceOf(Bow);
    expect(longBow.name).toBe('Длинный лук');
    expect(longBow.attack).toBe(15);
    expect(longBow.durability).toBe(200);
    expect(longBow.initDurability).toBe(200);
    expect(longBow.range).toBe(4);
  });

  test('creates axe with correct properties', () => {
    const axe = new Axe();

    expect(axe).toBeInstanceOf(Sword);
    expect(axe.name).toBe('Секира');
    expect(axe.attack).toBe(27);
    expect(axe.durability).toBe(800);
    expect(axe.initDurability).toBe(800);
    expect(axe.range).toBe(1);
  });

  test('creates storm staff with correct properties', () => {
    const stormStaff = new StormStaff();

    expect(stormStaff).toBeInstanceOf(Staff);
    expect(stormStaff.name).toBe('Посох Бури');
    expect(stormStaff.attack).toBe(10);
    expect(stormStaff.durability).toBe(300);
    expect(stormStaff.initDurability).toBe(300);
    expect(stormStaff.range).toBe(3);
  });
});
