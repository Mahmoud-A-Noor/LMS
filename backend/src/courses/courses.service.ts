import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { CourseSection } from './entities/courseSection.entity';
import { UserCourseAccess } from 'src/user-course-access/entities/userCourseAccess.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @InjectRepository(Lesson)
    private readonly lessonRepository: EntityRepository<Lesson>,
    @InjectRepository(CourseSection)
    private readonly courseSectionRepository: EntityRepository<CourseSection>,
    @InjectRepository(UserCourseAccess)
    private readonly userCourseAccessRepository: EntityRepository<UserCourseAccess>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    await this.courseRepository.getEntityManager().persistAndFlush(course);
    return course;
  }

  // async findAll(){    
  //   const courses = await this.courseRepository.findAll();

  //   const coursesWithCounts = await Promise.all(
  //     courses.map(async (course) => ({
  //       id: course.id,
  //       name: course.name,
  //       lessonsCount: await this.lessonRepository.count({ courseSection: { course: course.id } }),
  //       sectionsCount: await this.courseSectionRepository.count({ course: course.id }),
  //       studentsCount: await this.userCourseAccessRepository.count({ course: course.id }),
  //     }))
  //   );

  //   return coursesWithCounts;
  // }

  async findAll(){    
    const sql = `
      SELECT 
        c.id, c.name, 
        (SELECT COUNT(*) FROM lessons l 
          JOIN course_sections cs ON l.course_section_id = cs.id 
          WHERE cs.course_id = c.id) AS lessonsCount,
        (SELECT COUNT(*) FROM course_sections WHERE course_id = c.id) AS sectionsCount,
        (SELECT COUNT(*) FROM user_course_accesses WHERE course_id = c.id) AS studentsCount
      FROM courses c;
    `;

    const coursesWithCounts = await this.courseRepository.getEntityManager().getConnection().execute(sql);
    return coursesWithCounts;
  }

  async findOne(id: string): Promise<Course | null> {
    const course = await this.courseRepository.findOne(id, {populate: ["sections.lessons"], orderBy: {sections: {order: "ASC"}}});
    if(!course) throw new NotFoundException(`Course could not be found`);
    return course
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course | null> {
    const course = await this.courseRepository.findOne(id);
    if (!course) throw new NotFoundException(`Course could not be found`);

    this.courseRepository.assign(course, updateCourseDto);
    await this.courseRepository.getEntityManager().persistAndFlush(course);
    
    return course;
  }

  async remove(id: string) {
    try {
      const course = await this.courseRepository.findOne(id);
      if (!course) throw new NotFoundException(`Course could not be found`);
      return await this.courseRepository.getEntityManager().removeAndFlush(course);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting the course');
    }
  }
}
