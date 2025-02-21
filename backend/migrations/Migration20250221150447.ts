import { Migration } from '@mikro-orm/migrations';

export class Migration20250221150447 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`users\` modify \`deleted_at\` datetime null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`users\` modify \`deleted_at\` datetime not null;`);
  }

}
