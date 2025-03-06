import { Migration } from '@mikro-orm/migrations';

export class Migration20250305152700 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`purchases\` add \`status\` enum('pending', 'paid', 'refunded') not null default 'pending';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`purchases\` drop column \`status\`;`);
  }

}
