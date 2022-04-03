import { User } from '../entity/user.entity';
import { EntityRepository } from '@mikro-orm/core';

export class UserRepository extends EntityRepository<User> {
  async activeUser(id: string) {
    const userToActive = await super.findOne({ id });
    userToActive.isActive = true;
    return true;
  }

  async getByEmail(email: string) {
    return super.findOne({ email });
  }
}
