import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: string,
  ): Task[] {
    const paginate = (list: Task[]) => {
      if (!limit && (page === 1 || isNaN(page))) return list

      const startIndex = (page - 1) * limit

      return list.slice(startIndex, startIndex + limit)
    }
    const sortOutput = (list: Task[]) => {
      if (!sortBy) return list

      return [...list].sort((a, b) => a[sortBy].localeCompare(b[sortBy]))
    }

    if (status) {
      return sortOutput(paginate(this.tasks.filter((task: Task) => task.status === status)))
    }

    return sortOutput(paginate(this.tasks))
  }
}
