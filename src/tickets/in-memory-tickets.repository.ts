import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { TicketsRepository } from './tickets.repository.js';
import { Ticket } from './ticket.model.js';
import { TICKETS_SEED } from './tickets.seed.js';

@Injectable()
export class InMemoryTicketsRepository extends TicketsRepository implements OnModuleInit {
  private items: Ticket[] = [];
  private nextId = 1;
  private readonly logger = new Logger(InMemoryTicketsRepository.name);

  onModuleInit(): void {
    this.items = TICKETS_SEED.map((t) => ({ ...t, tags: [...t.tags] }));
    this.nextId = Math.max(0, ...this.items.map((t) => t.id)) + 1;
    this.logger.log(`Завантажено заявок: ${this.items.length}`);
  }

  async findAll(filter?: Partial<Pick<Ticket, 'status' | 'authorId'>>): Promise<Ticket[]> {
    let result = this.items;
    if (filter?.status) {
      result = result.filter(t => t.status === filter.status);
    }
    if (filter?.authorId) {
      result = result.filter(t => t.authorId === filter.authorId);
    }
    return result.map(t => ({ ...t, tags: [...t.tags] }));
  }

  async findById(id: number): Promise<Ticket | undefined> {
    const ticket = this.items.find(t => t.id === id);
    return ticket ? { ...ticket, tags: [...ticket.tags] } : undefined;
  }

  async create(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    const newTicket: Ticket = { 
      ...ticket, 
      id: this.nextId++, 
      tags: ticket.tags ? [...ticket.tags] : [] 
    };
    this.items.push(newTicket);
    return { ...newTicket, tags: [...newTicket.tags] };
  }

  async remove(id: number): Promise<boolean> {
    const index = this.items.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    this.items.splice(index, 1);
    return true;
  }
}