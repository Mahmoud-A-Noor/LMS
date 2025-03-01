import { Migration } from '@mikro-orm/migrations';

export class Migration20250228200831 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`lessons\` modify \`order\` int unsigned not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`lessons\` modify \`order\` int not null;`);
  }

}
