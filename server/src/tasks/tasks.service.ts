import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Task } from 'generated/prisma/client';
import { FindAllOptions } from 'src/types/types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cache_manager: Cache,
  ) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    const task = await this.prisma.task.create({ data });
    await this.cache_manager.clear();
    return task;
  }

  async findAll(options: FindAllOptions): Promise<Task[]> {
    const { status, orderBy } = options;

    const cacheKey = `tasks:${status ?? 'all'}:dueDate:${orderBy ?? 'asc'}`;
    const cached = await this.cache_manager.get<Task[]>(cacheKey);
    if (cached) return cached;

    const where = status ? { status } : {};

    const tasks = await this.prisma.task.findMany({
      where,
      orderBy: { dueDate: orderBy ?? 'asc' },
    });

    await this.cache_manager.set(cacheKey, tasks, 120000);
    return tasks;
  }

  async update(
    id: number,
    data: Partial<{
      title: string;
      description: string;
      dueDate: Date;
      status: string;
    }>,
  ): Promise<Task> {
    const task = await this.prisma.task.update({ where: { id }, data });
    await this.cache_manager.clear();
    return task;
  }

  async remove(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    const task = await this.prisma.task.delete({ where });
    await this.cache_manager.clear();
    return task;
  }
}
