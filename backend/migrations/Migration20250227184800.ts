import { Migration } from '@mikro-orm/migrations';

export class Migration20250227184800 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`course_sections\` add \`order\` int null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`course_sections\` drop column \`order\`;`);
  }

}
