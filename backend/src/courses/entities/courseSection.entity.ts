import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection, Cascade, Enum } from '@mikro-orm/core';
import { Course } from './course.entity';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { SectionStatus } from '../../common/enums/section-status';

@Entity({ tableName: 'course_sections' })
export class CourseSection {
    @PrimaryKey()
    id: string = crypto.randomUUID();

    @Property({ type: 'varchar', length: 255 })
    name!: string;

    @Property({ type: 'text', nullable: true })
    description: string;

    @Enum({ items: () => SectionStatus, default: SectionStatus.PRIVATE })
    status: SectionStatus = SectionStatus.PRIVATE;
    
    // @Property({ type: 'int', nullable: true })
    // order: number;

    @Property({ type: "integer" })
    order: number = 0;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;



    @ManyToOne(() => Course, {deleteRule: 'cascade'})
    course!: Course;

    @OneToMany(() => Lesson, lesson => lesson.courseSection)
    lessons = new Collection<Lesson>(this);
}
