import { Entity, PrimaryKey, Property, ManyToMany, OneToMany, Collection, Cascade, Enum } from '@mikro-orm/core';
import { Product } from '../../products/entities/product.entity';
import { CourseSection } from './courseSection.entity';
import { CourseStatus } from '../../common/enums/course-status.enum';

@Entity({ tableName: 'courses' })
export class Course {
    @PrimaryKey()
    id: string = crypto.randomUUID();

    @Property({ type: 'varchar', length: 255 })
    name!: string;

    @Enum({ items: () => CourseStatus, default: CourseStatus.PRIVATE })
    status: CourseStatus = CourseStatus.PRIVATE;

    @Property({ type: 'int' })
    order!: number;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;


    
    @OneToMany(() => CourseSection, section => section.course, { cascade: [Cascade.PERSIST, Cascade.REMOVE] })
    sections = new Collection<CourseSection>(this);

    @ManyToMany(() => Product, product => product.courses)
    products = new Collection<Product>(this);
}
