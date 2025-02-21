import { Migration } from '@mikro-orm/migrations';

export class Migration20250221182622 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`users\` modify \`username\` text not null, modify \`password\` text not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`users\` modify \`username\` varchar(255) not null, modify \`password\` varchar(255) not null;`);
  }

}
