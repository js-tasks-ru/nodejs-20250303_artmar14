import { IsDateString, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  title: string

  @IsString()
  description: string

  @IsDateString()
  @IsOptional()
  deadline: string
}
