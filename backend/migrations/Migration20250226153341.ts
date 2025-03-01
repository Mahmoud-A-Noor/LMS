import { Migration } from '@mikro-orm/migrations';

export class Migration20250226153341 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`course_sections\` add \`status\` enum('public', 'private') not null default 'private';`);
    this.addSql(`alter table \`course_sections\` modify \`description\` text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`course_sections\` drop column \`status\`;`);

    this.addSql(`alter table \`course_sections\` modify \`description\` text not null;`);
  }

}
