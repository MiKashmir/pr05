import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model.js';
import { USERS_SEED } from './users.seed.js'; 

@Injectable()
export class UsersService {
  private readonly users: User[] = USERS_SEED.map((u) => ({ ...u }));

  findAll(): User[] {
    return this.users.map((u) => ({ ...u }));
  }

  find(id: number): User | undefined {
    const user = this.users.find((u) => u.id === id);
    return user ? { ...user } : undefined;
  }

  findOne(id: number): User {
    const user = this.find(id);
    if (!user) {
      throw new NotFoundException(`Користувача з id=${id} не знайдено`);
    }
    return user;
  }
}