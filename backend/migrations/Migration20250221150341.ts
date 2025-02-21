import { Migration } from '@mikro-orm/migrations';

export class Migration20250221150341 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`users\` modify \`image_url\` text null;`);
    this.addSql(`alter table \`users\` change \`name\` \`username\` varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`users\` modify \`image_url\` text not null;`);
    this.addSql(`alter table \`users\` change \`username\` \`name\` varchar(255) not null;`);
  }

}
