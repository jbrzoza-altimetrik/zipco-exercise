import { Type } from "class-transformer";
import { IsString, IsDefined, IsNumber, Min } from "class-validator";

export class CreateUserRequest {

    @IsDefined()
    @IsString()
    name: string

    @IsDefined()
    @IsString()
    email: string

    @IsDefined()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    monthlySalary: number

    @IsDefined()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    monthlyExpenses: number
}
