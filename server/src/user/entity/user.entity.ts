import {
  Entity,
  EntityRepositoryType,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { UserRepository } from '../repository/user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {
  [EntityRepositoryType]?: UserRepository;

  @PrimaryKey()
  id: string = v4();

  @Property({ hidden: true })
  password: string;

  @Property({ unique: true })
  email: string;

  @Property({ default: false })
  isActive: boolean;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
