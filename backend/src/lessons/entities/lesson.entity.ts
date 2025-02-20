import { Entity, PrimaryKey, Property, ManyToOne, Enum } from '@mikro-orm/core';
import { CourseSection } from '../../courses/entities/courseSection.entity';

export enum LessonStatus {
    PUBLIC = 'public',
    PRIVATE = 'private',
    PREVIEW = 'preview'
}

@Entity({ tableName: 'lessons' })
export class Lesson {
    @PrimaryKey()
    id: string = crypto.randomUUID();

    @Property({ type: 'varchar', length: 255 })
    name!: string;

    @Property({ type: 'text', nullable: true })
    description?: string;

    @Property({ type: 'text' })
    youtubeVideoId!: string;

    @Property({ type: 'int' })
    order!: number;

    @Enum({items: () => LessonStatus, default: LessonStatus.PRIVATE})
    status: LessonStatus = LessonStatus.PRIVATE;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;


  
  @ManyToOne(() => CourseSection, {deleteRule: 'cascade'})
  courseSection!: CourseSection;
}
