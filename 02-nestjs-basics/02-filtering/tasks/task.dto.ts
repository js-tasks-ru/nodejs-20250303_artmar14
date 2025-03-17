import { TaskStatus } from "./task.model";
import { IsIn, IsInt, IsPositive, IsString, Min } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class TaskDTO {
  @IsIn(['pending', 'in_progress', 'completed'])
  status: TaskStatus

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  page: number

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @Min(1)
  limit: number

  @IsIn(['title', 'status'])
  sortBy: string
}

export class TaskQueryDto extends PartialType(TaskDTO) {}
