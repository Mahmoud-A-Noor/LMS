import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id: string = crypto.randomUUID();

  @Property({})
  name!: string

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Enum({items: () => UserRole, default: UserRole.USER})
  role: UserRole = UserRole.USER;

  @Property({ type: "text" })
  image_url: string;

  @Property({ type: 'timestamp' })
  deletedAt: Date;

  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
  updatedAt: Date;
}