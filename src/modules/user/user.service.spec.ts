import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UserRepository } from './user.repository';

describe('UserService', () => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule]
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
        userService = module.get<UserService>(UserService);
    });

    it('should not create user because email is already used', async () => {
        // GIVEN:
        const userMock = getMockUser();

        jest.spyOn(userRepository, 'isEmailUsed').mockReturnValue(Promise.resolve(true));

        try {
            // WHEN:
            await userService.createUser(userMock)
        } catch (error) {
            // THEN:
            expect(error).toBeInstanceOf(ConflictException);
        }
    });

    it('should create user', async () => {
        // GIVEN:
        const userMock = getMockUser();

        jest.spyOn(userRepository, 'isEmailUsed').mockReturnValue(Promise.resolve(false));
        const createUserSpy = jest.spyOn(userRepository, 'create').mockReturnValue(Promise.resolve(null));

        // WHEN:
        await userService.createUser(userMock)

        // THEN:
        expect(createUserSpy).toBeCalledWith(userMock);
    });
});

const getMockUser = () => ({
    name: 'test',
    email: 'test@test.pl',
    monthlySalary: 1000,
    monthlyExpenses: 2000,
});
