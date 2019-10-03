import { Injectable } from '@nestjs/common';
import { User } from './models/user';
import find from 'lodash/fp/find';
import findIndex from 'lodash/fp/findIndex';
import { UsersArgs } from './dto/users.args';

const users: User[] = [
  {
    id: '1',
    name: 'Ben',
    surname: 'Stiller',
  },
  {
    id: '2',
    name: 'Yaroslav',
    surname: 'Muliar',
  },
];

@Injectable()
export class UserService {
  async findOneById(id: string): Promise<User | undefined> {
    return find({ id }, users);
  }

  updateOneById(newUserData: Partial<User>): User | undefined {
    const idx = findIndex({ id: newUserData.id }, users);
    const oldUser = find({ id: newUserData.id }, users);
    if (!oldUser || idx < 0) {
      return undefined;
    }
    const updatedUser: User = { ...oldUser, ...newUserData };
    users[idx] = updatedUser;
    return updatedUser;
  }

  async findAll(args: UsersArgs): Promise<User[]> {
    return await new Promise((res) => {
      res(users);
    });
  }
}
