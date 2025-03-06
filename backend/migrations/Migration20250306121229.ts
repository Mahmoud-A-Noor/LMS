import { Migration } from '@mikro-orm/migrations';

export class Migration20250306121229 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user_lesson_completes\` (\`user_id\` varchar(255) not null, \`lesson_id\` varchar(255) not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, primary key (\`user_id\`, \`lesson_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user_lesson_completes\` add index \`user_lesson_completes_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`user_lesson_completes\` add index \`user_lesson_completes_lesson_id_index\`(\`lesson_id\`);`);

    this.addSql(`alter table \`user_lesson_completes\` add constraint \`user_lesson_completes_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`user_lesson_completes\` add constraint \`user_lesson_completes_lesson_id_foreign\` foreign key (\`lesson_id\`) references \`lessons\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`drop table if exists \`user_course_access\`;`);

    this.addSql(`alter table \`purchases\` drop foreign key \`purchases_user_id_foreign\`;`);
    this.addSql(`alter table \`purchases\` drop foreign key \`purchases_product_id_foreign\`;`);

    this.addSql(`alter table \`course_sections\` modify \`order\` int not null default 0;`);

    this.addSql(`alter table \`purchases\` add \`stripe_payment_intent_id\` varchar(255) null;`);
    this.addSql(`alter table \`purchases\` modify \`stripe_session_id\` varchar(255) not null;`);
    this.addSql(`alter table \`purchases\` add constraint \`purchases_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`purchases\` add constraint \`purchases_product_id_foreign\` foreign key (\`product_id\`) references \`products\` (\`id\`) on update cascade on delete set null;`);
    this.addSql(`alter table \`purchases\` add unique \`purchases_stripe_payment_intent_id_unique\`(\`stripe_payment_intent_id\`);`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table \`user_course_access\` (\`user_id\` varchar(255) not null, \`lesson_id\` varchar(255) not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, primary key (\`user_id\`, \`lesson_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user_course_access\` add index \`user_course_access_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`user_course_access\` add index \`user_course_access_lesson_id_index\`(\`lesson_id\`);`);

    this.addSql(`alter table \`user_course_access\` add constraint \`user_course_access_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`user_course_access\` add constraint \`user_course_access_lesson_id_foreign\` foreign key (\`lesson_id\`) references \`lessons\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`drop table if exists \`user_lesson_completes\`;`);

    this.addSql(`alter table \`purchases\` drop foreign key \`purchases_user_id_foreign\`;`);
    this.addSql(`alter table \`purchases\` drop foreign key \`purchases_product_id_foreign\`;`);

    this.addSql(`alter table \`course_sections\` modify \`order\` int null;`);

    this.addSql(`alter table \`purchases\` drop index \`purchases_stripe_payment_intent_id_unique\`;`);
    this.addSql(`alter table \`purchases\` drop column \`stripe_payment_intent_id\`;`);

    this.addSql(`alter table \`purchases\` modify \`stripe_session_id\` varchar(255) null;`);
    this.addSql(`alter table \`purchases\` add constraint \`purchases_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete RESTRICT;`);
    this.addSql(`alter table \`purchases\` add constraint \`purchases_product_id_foreign\` foreign key (\`product_id\`) references \`products\` (\`id\`) on update cascade on delete RESTRICT;`);
  }

}
