import { Resolver } from 'type-graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';

import { User } from './models/user';
import { UserService } from './user.service';
import { UserInput } from './dto/new-user.input';
import { UsersArgs } from './dto/users.args';

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Query(returns => User, { name: 'User' })
  async getUser(@Args('id') id: string): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Query(returns => [User])
  async getUsers(@Args() usersArgs: UsersArgs): Promise<User[]> {
    const users = await this.userService.findAll(usersArgs);
    return users;
  }

  @Mutation(returns => User)
  updateUser(@Args('newUserData') newUserData: UserInput): User {
    const user = this.userService.updateOneById(newUserData);
    if (!user) {
      throw new NotFoundException(newUserData.id);
    }
    return user;
  }
}
