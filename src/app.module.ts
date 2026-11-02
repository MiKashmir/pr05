import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module.js';
import { HealthController } from './health.controller.js';
import { APP_INFO, appInfoFactory } from './app-info.js';
import { TicketsModule } from './tickets/tickets.module.js';

@Module({
  imports: [UsersModule, TicketsModule],
  controllers: [HealthController],
  providers: [
    { provide: APP_INFO, useFactory: appInfoFactory },
  ],
})
export class AppModule {}