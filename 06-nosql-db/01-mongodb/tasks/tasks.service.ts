import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.TaskModel.create(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return this.TaskModel.find()
  }

  async findOne(id: ObjectId) {
    return this.TaskModel.findById(id)
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.TaskModel.updateOne(id, updateTaskDto)
  }

  async remove(id: ObjectId) {
    // todo: check if exists
    this.TaskModel.deleteOne({ _id: id })
  }
}
