import { Migration } from '@mikro-orm/migrations';

export class Migration20250222191611 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`users\` add \`refresh_token\` text null;`);
    this.addSql(`alter table \`users\` modify \`email\` text not null;`);

    this.addSql(`alter table \`purchases\` modify \`refunded_at\` datetime null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`users\` drop column \`refresh_token\`;`);

    this.addSql(`alter table \`users\` modify \`email\` varchar(255) not null;`);

    this.addSql(`alter table \`purchases\` modify \`refunded_at\` datetime not null;`);
  }

}
