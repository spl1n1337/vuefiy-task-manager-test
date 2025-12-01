import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Prisma, Task } from 'generated/prisma/client';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body()
    taskData: Prisma.TaskCreateInput,
  ): Promise<Task> {
    return await this.tasksService.create(taskData);
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
  ): Promise<Task[]> {
    return await this.tasksService.findAll({
      status,
      orderBy,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    taskData: {
      title: string;
      description: string;
      dueDate: Date;
      status: string;
    },
  ) {
    return this.tasksService.update(+id, taskData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove({ id: Number(id) });
  }
}
