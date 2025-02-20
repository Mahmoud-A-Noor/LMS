import { Migration } from '@mikro-orm/migrations';

export class Migration20250220101528 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`courses\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, \`status\` enum('public', 'private') not null default 'private', \`order\` int not null, \`course_id\` varchar(36) not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`course_sections\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` text not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, \`course_id\` varchar(255) not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`course_sections\` add index \`course_sections_course_id_index\`(\`course_id\`);`);

    this.addSql(`create table \`lessons\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` text null, \`youtube_video_id\` text not null, \`order\` int not null, \`status\` enum('public', 'private', 'preview') not null default 'private', \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, \`course_section_id\` varchar(255) not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`lessons\` add index \`lessons_course_section_id_index\`(\`course_section_id\`);`);

    this.addSql(`create table \`products\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, \`description\` varchar(255) not null, \`image_url\` varchar(255) not null, \`price_in_dollars\` numeric(10,2) not null, \`status\` enum('public', 'private') not null default 'private', \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`product_courses\` (\`product_id\` varchar(255) not null, \`course_id\` varchar(255) not null, primary key (\`product_id\`, \`course_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`product_courses\` add index \`product_courses_product_id_index\`(\`product_id\`);`);
    this.addSql(`alter table \`product_courses\` add index \`product_courses_course_id_index\`(\`course_id\`);`);

    this.addSql(`create table \`users\` (\`id\` varchar(255) not null, \`name\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`role\` enum('user', 'admin') not null default 'user', \`image_url\` text not null, \`deleted_at\` datetime not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`users\` add unique \`users_email_unique\`(\`email\`);`);

    this.addSql(`create table \`purchases\` (\`id\` varchar(36) not null, \`price_paid_in_cents\` int not null, \`product_details\` json not null, \`stripe_session_id\` varchar(255) not null, \`refunded_at\` datetime not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, \`user_id\` varchar(255) not null, \`product_id\` varchar(255) not null, primary key (\`id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`purchases\` add unique \`purchases_stripe_session_id_unique\`(\`stripe_session_id\`);`);
    this.addSql(`alter table \`purchases\` add index \`purchases_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`purchases\` add index \`purchases_product_id_index\`(\`product_id\`);`);

    this.addSql(`create table \`user_course_accesses\` (\`user_id\` varchar(255) not null, \`course_id\` varchar(255) not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, primary key (\`user_id\`, \`course_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user_course_accesses\` add index \`user_course_accesses_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`user_course_accesses\` add index \`user_course_accesses_course_id_index\`(\`course_id\`);`);

    this.addSql(`create table \`user_course_access\` (\`user_id\` varchar(255) not null, \`lesson_id\` varchar(255) not null, \`created_at\` datetime not null default CURRENT_TIMESTAMP, \`updated_at\` datetime not null default CURRENT_TIMESTAMP, primary key (\`user_id\`, \`lesson_id\`)) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`user_course_access\` add index \`user_course_access_user_id_index\`(\`user_id\`);`);
    this.addSql(`alter table \`user_course_access\` add index \`user_course_access_lesson_id_index\`(\`lesson_id\`);`);

    this.addSql(`alter table \`course_sections\` add constraint \`course_sections_course_id_foreign\` foreign key (\`course_id\`) references \`courses\` (\`id\`) on update cascade on delete CASCADE;`);

    this.addSql(`alter table \`lessons\` add constraint \`lessons_course_section_id_foreign\` foreign key (\`course_section_id\`) references \`course_sections\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`product_courses\` add constraint \`product_courses_product_id_foreign\` foreign key (\`product_id\`) references \`products\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`product_courses\` add constraint \`product_courses_course_id_foreign\` foreign key (\`course_id\`) references \`courses\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`purchases\` add constraint \`purchases_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete RESTRICT;`);
    this.addSql(`alter table \`purchases\` add constraint \`purchases_product_id_foreign\` foreign key (\`product_id\`) references \`products\` (\`id\`) on update cascade on delete RESTRICT;`);

    this.addSql(`alter table \`user_course_accesses\` add constraint \`user_course_accesses_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`user_course_accesses\` add constraint \`user_course_accesses_course_id_foreign\` foreign key (\`course_id\`) references \`courses\` (\`id\`) on update cascade on delete cascade;`);

    this.addSql(`alter table \`user_course_access\` add constraint \`user_course_access_user_id_foreign\` foreign key (\`user_id\`) references \`users\` (\`id\`) on update cascade on delete cascade;`);
    this.addSql(`alter table \`user_course_access\` add constraint \`user_course_access_lesson_id_foreign\` foreign key (\`lesson_id\`) references \`lessons\` (\`id\`) on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`course_sections\` drop foreign key \`course_sections_course_id_foreign\`;`);

    this.addSql(`alter table \`product_courses\` drop foreign key \`product_courses_course_id_foreign\`;`);

    this.addSql(`alter table \`user_course_accesses\` drop foreign key \`user_course_accesses_course_id_foreign\`;`);

    this.addSql(`alter table \`lessons\` drop foreign key \`lessons_course_section_id_foreign\`;`);

    this.addSql(`alter table \`user_course_access\` drop foreign key \`user_course_access_lesson_id_foreign\`;`);

    this.addSql(`alter table \`product_courses\` drop foreign key \`product_courses_product_id_foreign\`;`);

    this.addSql(`alter table \`purchases\` drop foreign key \`purchases_product_id_foreign\`;`);

    this.addSql(`alter table \`purchases\` drop foreign key \`purchases_user_id_foreign\`;`);

    this.addSql(`alter table \`user_course_accesses\` drop foreign key \`user_course_accesses_user_id_foreign\`;`);

    this.addSql(`alter table \`user_course_access\` drop foreign key \`user_course_access_user_id_foreign\`;`);

    this.addSql(`drop table if exists \`courses\`;`);

    this.addSql(`drop table if exists \`course_sections\`;`);

    this.addSql(`drop table if exists \`lessons\`;`);

    this.addSql(`drop table if exists \`products\`;`);

    this.addSql(`drop table if exists \`product_courses\`;`);

    this.addSql(`drop table if exists \`users\`;`);

    this.addSql(`drop table if exists \`purchases\`;`);

    this.addSql(`drop table if exists \`user_course_accesses\`;`);

    this.addSql(`drop table if exists \`user_course_access\`;`);
  }

}
