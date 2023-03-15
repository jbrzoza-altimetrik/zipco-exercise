import { Type } from "class-transformer";
import { IsDefined, IsNumber } from "class-validator";

export class CreateAccountRequest {
    @IsDefined()
    @Type(() => Number)
    @IsNumber()
    userId: number
}
