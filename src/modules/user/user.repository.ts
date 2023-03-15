import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { prisma } from '../../lib/db';
import { CreateUserRequest } from './models/create-user-request';

@Injectable()
export class UserRepository {

    public create(data: CreateUserRequest): Promise<User> {
        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                monthlyExpenses: data.monthlyExpenses,
                monthlySalary: data.monthlySalary,
            },
        });
    }

    public listUsers(): Promise<User[]> {
        return prisma.user.findMany();
    }

    public getUser(id: number): Promise<User> {
        return prisma.user.findFirst({ where: { id } });
    }

    public async isEmailUsed(email: string): Promise<boolean> {
        return (await prisma.user.count({ where: { email } }) > 0);
    }

    public async userExists(id: number): Promise<boolean> {
        return (await prisma.user.count({ where: { id } }) > 0);
    }
}
