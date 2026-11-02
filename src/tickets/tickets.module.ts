import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller.js';
import { TicketsService } from './tickets.service.js';
import { TicketsRepository } from './tickets.repository.js';
import { InMemoryTicketsRepository } from './in-memory-tickets.repository.js';
import { UsersModule } from '../users/users.module.js';
import { CLOCK, systemClock } from '../common/clock.js';

@Module({
  imports: [UsersModule], // Імпортуємо, щоб був доступний UsersService
  controllers: [TicketsController],
  providers: [
    TicketsService,
    { provide: TicketsRepository, useClass: InMemoryTicketsRepository },
    { provide: CLOCK, useValue: systemClock },
  ],
})
export class TicketsModule {}