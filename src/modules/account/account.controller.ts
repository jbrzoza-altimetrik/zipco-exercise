import { Body, Controller, Get, HttpException, Logger, Post } from "@nestjs/common";
import { Account } from "@prisma/client";
import { AccountService } from "./account.service";
import { CreateAccountRequest } from "./models/create-account-request";

@Controller('accounts')
export class AccountController {

    constructor(
        private readonly accountService: AccountService,
    ) { }

    @Post()
    public async createAccount(
        @Body() body: CreateAccountRequest
    ): Promise<Account> {
        try {
            return await this.accountService.createAccount(
                body
            );
        } catch (e) {
            const msg = `Failed to create an account: ${e.message}`;
            Logger.error(msg);

            throw new HttpException(msg, e.status || 500);
        }
    }

    @Get()
    public async listAccounts(): Promise<Account[]> {
        try {
            const accounts = await this.accountService.listAccounts();

            return accounts;
        } catch (e) {
            const msg = `Failed to list accounts: ${e.message}`;
            Logger.error(msg);

            throw new HttpException(msg, e.status || 500);
        }
    }

}
