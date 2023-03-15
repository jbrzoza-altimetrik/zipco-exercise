import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { UserService } from '../user/user.service';
import { AccountRepository } from './account.repository';
import { CreateAccountRequest } from './models/create-account-request';

@Injectable()
export class AccountService {

    private readonly MIN_MONTHLY_SALARY = 1000;

    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly userService: UserService,
    ) { }

    public async createAccount(data: CreateAccountRequest): Promise<Account> {
        const userExists = await this.userService.userExists(data.userId);

        if (!userExists) {
            throw new BadRequestException(`User with id ${data.userId} does not exists`);
        }

        const hasMinimumMonthlySalary = await this.hasMinimumMonthlySalary(data.userId);

        if (!hasMinimumMonthlySalary) {
            throw new ForbiddenException('Min monthly salary is to low');
        }

        const user = await this.userService.getUser(data.userId);
        return this.accountRepository.create(data.userId, user.email);
    }

    public listAccounts(): Promise<Account[]> {
        return this.accountRepository.getAll();
    }

    private async hasMinimumMonthlySalary(userId: number): Promise<boolean> {
        const user = await this.userService.getUser(userId);

        return user.monthlySalary >= this.MIN_MONTHLY_SALARY
    }
}
