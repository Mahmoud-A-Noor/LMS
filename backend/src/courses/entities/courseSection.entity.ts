import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { Course } from './course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity({ tableName: 'course_sections' })
export class CourseSection {
    @PrimaryKey()
    id: string = crypto.randomUUID();

    @Property({ type: 'varchar', length: 255 })
    name!: string;

    @Property({ type: 'text' })
    description!: string;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;



    @ManyToOne(() => Course, {deleteRule: 'CASCADE'})
    course!: Course;

    @OneToMany(() => Lesson, lesson => lesson.courseSection, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
    lessons = new Collection<Lesson>(this);
}
