import { Controller, Get, Post, Delete, Param, Query, Body, HttpCode, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(@Query('status') status?: any, @Query('authorId') authorId?: string) {
    return this.ticketsService.findAll({ 
      status: status, 
      authorId: authorId ? parseInt(authorId, 10) : undefined 
    });
  }

  @Get(':ticketId')
  findOne(@Param('ticketId', ParseIntPipe) ticketId: number) {
    return this.ticketsService.findOne(ticketId);
  }

  @Post()
  create(@Body() input: any) {
    return this.ticketsService.create(input);
  }

  @Delete(':ticketId')
  @HttpCode(204)
  remove(@Param('ticketId', ParseIntPipe) ticketId: number) {
    return this.ticketsService.remove(ticketId);
  }
}