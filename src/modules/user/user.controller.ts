import { Body, Controller, Get, HttpException, Logger, NotFoundException, Param, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserRequest } from "./models/create-user-request";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
    ) { }

    @Post()
    public async createUser(
        @Body() body: CreateUserRequest
    ): Promise<User> {
        try {
            return await this.userService.createUser(
                body
            );
        } catch (e) {
            const msg = `Failed to create a user: ${e.message}`;
            Logger.error(msg);

            throw new HttpException(msg, e.status || 500);
        }
    }

    @Get()
    public async listUsers(): Promise<User[]> {
        try {
            const users = await this.userService.listUsers();
            
            return users;
        } catch (e) {
            const msg = `Failed to list users: ${e.message}`;
            Logger.error(msg);

            throw new HttpException(msg, e.status || 500);
        }
    }

    @Get(':id')
    public async getUser(
        @Param('id') id: string
    ): Promise<User> {
        try {
            const user = await this.userService.getUser(
                parseInt(id, 10)
            );

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (e) {
            const msg = `Failed to get a user: ${e.message}`;
            Logger.error(msg);

            throw new HttpException(msg, e.status || 500);
        }
    }
}
