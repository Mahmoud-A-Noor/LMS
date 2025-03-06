import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";
import { Lesson } from "../../lessons/entities/lesson.entity";

@Entity({ tableName: 'user_lesson_completes' })
export class UserLessonComplete {

    @ManyToOne(() => User, { fieldName: 'user_id', primary: true, deleteRule: 'cascade' })
    user!: User;
    
    @ManyToOne(() => Lesson, { fieldName: 'lesson_id', primary: true, deleteRule: 'cascade' })
    lesson!: Lesson;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;
}
