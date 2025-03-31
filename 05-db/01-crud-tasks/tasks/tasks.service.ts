import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions } from "typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { GetTasksDto } from "./dto/get-tasks.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto)
    return this.taskRepository.save(task)
  }

  async findAll(query: GetTasksDto): Promise<Task[]> {
    const { page, pageSize } = query
    const findOptions: FindManyOptions = {
      order: {
        id: "ASC"
      }
    }
    if (page && pageSize) {
      findOptions.skip = (page - 1) * pageSize
      findOptions.take = pageSize
    }

    const tasks = await this.taskRepository.find(findOptions)
    if (!tasks.length) throw new NotFoundException("No tasks found.")

    return tasks
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } })
    if (!task) throw new NotFoundException("Task not found")

    return task
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id)
    Object.assign(task, updateTaskDto)

    return await this.taskRepository.save(task)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id) // Не совсем понимаю зачем здесь проверка на существование задачи
    await this.taskRepository.delete(id)
  }
}
