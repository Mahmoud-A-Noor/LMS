import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";
import { Course } from "./course.entity";

@Entity({ tableName: 'user_course_accesses' })
export class UserCourseAccess {

    @ManyToOne(() => User, { fieldName: 'user_id', primary: true, deleteRule: 'cascade' })
    user!: User;
  
    @ManyToOne(() => Course, { fieldName: 'course_id', primary: true, deleteRule: 'cascade' })
    course!: Course;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;
}
