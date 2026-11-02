import { Injectable, Inject, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository.js';
import { UsersService } from '../users/users.service.js';
import { CLOCK, type Clock } from '../common/clock.js';
import { Ticket } from './ticket.model.js';

@Injectable()
export class TicketsService {
  constructor(
    private readonly repo: TicketsRepository,
    private readonly users: UsersService,
    @Inject(CLOCK) private readonly clock: Clock,
  ) {}

  async findAll(filter?: { status?: Ticket['status']; authorId?: number }): Promise<Ticket[]> {
    return this.repo.findAll(filter);
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.repo.findById(id);
    if (!ticket) {
      throw new NotFoundException(`Заявку з id=${id} не знайдено`);
    }
    return ticket;
  }

  async create(input: any): Promise<Ticket> {
    // Перевіряємо, чи існує користувач
    const author = this.users.find(input.authorId);
    if (!author) {
      throw new UnprocessableEntityException(`Автора з id=${input.authorId} не знайдено`);
    }

    const now = this.clock.now().toISOString();
    const newTicket = {
      ...input,
      status: 'open',
      assigneeId: null,
      createdAt: now,
      updatedAt: now,
      tags: input.tags || [],
    };

    return this.repo.create(newTicket);
  }

  async remove(id: number): Promise<void> {
    const removed = await this.repo.remove(id);
    if (!removed) {
      throw new NotFoundException(`Заявку з id=${id} не знайдено`);
    }
  }
}