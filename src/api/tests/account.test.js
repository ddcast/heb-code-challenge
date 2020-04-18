import { users as initialUsers } from '../sample-data';
import { Account, getUserByPin, saveUser } from '../account';

describe('account tests', () => {
  let users = [];

  const getUsers = () => users;

  beforeEach(() => {
    users = [
      ...initialUsers,
    ];
  });
  
  test('getUserByPin can get a user object by pin', () => {
    const [testUser] = getUsers();
    const verifiedUser = getUserByPin(testUser.pin, users);

    expect(verifiedUser.name).toBe(testUser.name);
  });
  
  test('saveUser can update sample data user object', () => {
    const [testUser] = getUsers();
    saveUser(testUser, { balance: 1 }, users);
  
    const [verifiedUser] = getUsers();
    expect(verifiedUser.balance).toBe(1);
  });
  
  test('account can be withdrawn from', () => {
    const [testUser] = getUsers();
    const account = new Account(testUser.pin, users);
  
    const result = account.withdraw(100);
    expect(result.success).toBe(true);
  
    const [verifiedUser] = getUsers();
    expect(verifiedUser.balance).toBe(4900);
  });
  
  test('account cannot be overdrawn', () => {
    const [testUser] = getUsers();
    const account = new Account(testUser.pin, users);
  
    const result = account.withdraw(1001);
    expect(result.success).toBe(false);
  
    const [verifiedUser] = getUsers();
    expect(verifiedUser.balance).toBe(5000);
  });
  
  test('account can be deposited into', () => {
    const [testUser] = getUsers();
    const account = new Account(testUser.pin, users);
  
    account.deposit(100);
  
    const [verifiedUser] = getUsers();
    expect(verifiedUser.balance).toBe(5100);
  });
});

