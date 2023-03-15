import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/client';
import { prisma } from '../../lib/db';

@Injectable()
export class AccountRepository {


    public create(userId: number, email: string): Promise<Account> {
        return prisma.account.create({
            data: {
                email,
                userId,
            }
        });
    }

    public getAll(): Promise<Account[]> {
        return prisma.account.findMany();
    }
}
