import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserRequest } from './models/create-user-request';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    public async createUser(data: CreateUserRequest): Promise<User> {
        const isEmailUsed = await this.userRepository.isEmailUsed(data.email);
        if (isEmailUsed) {
            throw new ConflictException(`Email ${data.email} already in use`);
        }

        return this.userRepository.create(data);
    }

    public listUsers(): Promise<User[]> {
        return this.userRepository.listUsers();
    }

    public getUser(id: number): Promise<User> {
        return this.userRepository.getUser(id);
    }

    public userExists(id: number): Promise<boolean> {
        return this.userRepository.userExists(id);
    }
}
