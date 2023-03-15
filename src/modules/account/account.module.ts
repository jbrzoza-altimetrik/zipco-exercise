import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AccountController } from './account.controller';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';

@Module({
    controllers: [AccountController],
    providers: [AccountRepository, AccountService],
    imports: [UserModule]
})
export class AccountModule { }
