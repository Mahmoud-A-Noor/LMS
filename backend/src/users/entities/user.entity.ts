import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  Enum,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../../common/enums/user-role.enum';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id: string = crypto.randomUUID();

  @Property({ type: 'text' })
  username!: string;

  @Property({ type: 'text', unique: true })
  email!: string;

  @Property({ hidden: true, type: 'text' })
  password!: string;

  @Enum({ items: () => UserRole, default: UserRole.USER})
  role: UserRole;

  @Property({ type: 'text', nullable: true })
  imageUrl: string;
 
  @Property({ type: 'text', nullable: true, hidden: true })
  refreshToken: string;

  @Property({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Property({
    type: 'timestamp',
    defaultRaw: 'CURRENT_TIMESTAMP',
    onUpdate: () => new Date(),
  })
  updatedAt: Date;

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export { UserRole };
