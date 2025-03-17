import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskQueryDto } from "./task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() query:TaskQueryDto
  ) {
    const {
      status,
      page,
      limit,
      sortBy
    } = query

    return this.tasksService.getFilteredTasks(status, Number(page), Number(limit), sortBy)
  }
}
