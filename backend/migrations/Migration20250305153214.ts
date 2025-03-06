import { Migration } from '@mikro-orm/migrations';

export class Migration20250305153214 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`purchases\` modify \`stripe_session_id\` varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`purchases\` modify \`stripe_session_id\` varchar(255) not null;`);
  }

}
