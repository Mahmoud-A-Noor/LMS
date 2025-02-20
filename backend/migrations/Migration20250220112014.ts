import { Migration } from '@mikro-orm/migrations';

export class Migration20250220112014 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`courses\` drop column \`course_id\`;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`courses\` add \`course_id\` varchar(36) not null;`);
  }

}
