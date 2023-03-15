import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AccountModule } from './account.module';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: AccountRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AccountModule]
    }).compile();

    accountRepository = module.get<AccountRepository>(AccountRepository);
    accountService = module.get<AccountService>(AccountService);
    userService = module.get<UserService>(UserService);
  });

  it('should not create account because user does not exist', async () => {
    // GIVEN:
    const userObject = getMockUserWithSalary(500);

    jest.spyOn(userService, 'getUser').mockReturnValue(Promise.resolve(userObject));
    jest.spyOn(userService, 'userExists').mockReturnValue(Promise.resolve(false));

    try {
      // WHEN:
      await accountService.createAccount(mockAccount)
    } catch (error) {
      // THEN:
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should not create account because user does not meet minimum montly salary', async () => {
    // GIVEN:
    const userObject = getMockUserWithSalary(500);

    jest.spyOn(userService, 'getUser').mockReturnValue(Promise.resolve(userObject));
    jest.spyOn(userService, 'userExists').mockReturnValue(Promise.resolve(true));

    try {
      // WHEN:
      await accountService.createAccount(mockAccount)
    } catch (error) {
      // THEN:
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });

  it('should create account', async () => {
    // GIVEN:
    const userObject = getMockUserWithSalary(5000);

    jest.spyOn(userService, 'getUser').mockReturnValue(Promise.resolve(userObject));
    jest.spyOn(userService, 'userExists').mockReturnValue(Promise.resolve(true));
    const createAccountSpy = jest.spyOn(accountRepository, 'create').mockReturnValue(Promise.resolve(null));

    // WHEN:
    await accountService.createAccount(mockAccount)

    // THEN:
    expect(createAccountSpy).toBeCalledWith(mockAccount.userId, userObject.email);
  });
});

const mockAccount = { userId: 1 };

const getMockUserWithSalary = (monthlySalary: number): User => ({
  id: 1,
  createdAt: null,
  name: 'test',
  email: 't@t.com',
  monthlySalary,
  monthlyExpenses: 1001,
});