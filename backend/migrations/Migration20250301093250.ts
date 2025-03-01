import { Migration } from '@mikro-orm/migrations';

export class Migration20250301093250 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`lessons\` modify \`order\` int not null default 0;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`lessons\` modify \`order\` int unsigned not null;`);
  }

}
