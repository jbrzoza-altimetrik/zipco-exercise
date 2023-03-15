import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AccountModule, UserModule],
})
export class AppModule {}
