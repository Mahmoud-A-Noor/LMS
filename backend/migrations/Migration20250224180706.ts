import { Migration } from '@mikro-orm/migrations';

export class Migration20250224180706 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`courses\` drop column \`order\`;`);

    this.addSql(`alter table \`courses\` add \`description\` text not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`courses\` drop column \`description\`;`);

    this.addSql(`alter table \`courses\` add \`order\` int not null;`);
  }

}
