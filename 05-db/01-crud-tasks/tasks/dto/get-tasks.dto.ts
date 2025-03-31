import { IsInt, IsOptional, IsPositive, Min } from "class-validator";
import { Type } from "class-transformer";

export class GetTasksDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  limit: number;
}