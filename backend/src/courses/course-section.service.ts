import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { CourseSection } from './entities/courseSection.entity';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';
import { Course } from './entities/course.entity';


@Injectable()
export class CoursesSectionService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: EntityRepository<Course>,
    @InjectRepository(CourseSection)
    private readonly courseSectionRepository: EntityRepository<CourseSection>,
  ) {}

  async create(createCourseSectionDto: CreateCourseSectionDto): Promise<CourseSection> {
    const course = await this.courseRepository.findOne(createCourseSectionDto.courseId);
    if (!course) {
        throw new NotFoundException(`Course with ID ${createCourseSectionDto.courseId} not found`);
    }
    const courseSection = this.courseSectionRepository.create({
        name: createCourseSectionDto.name,
        status: createCourseSectionDto.status,
        course,
    });
    await this.courseSectionRepository.getEntityManager().persistAndFlush(courseSection);
    return courseSection;
  }

  async findAll(): Promise<CourseSection[]> {
    return this.courseSectionRepository.findAll();
  }

  async findOne(id: string): Promise<CourseSection | null> {
    return this.courseSectionRepository.findOne({ id });
  }

  async update(id: string, updateCourseSectionDto: UpdateCourseSectionDto): Promise<CourseSection | null> {
    const courseSection = await this.findOne(id);
    if (!courseSection) throw new NotFoundException("Course Section couldn't be found");;

    this.courseSectionRepository.assign(courseSection, updateCourseSectionDto);
    await this.courseSectionRepository.getEntityManager().persistAndFlush(courseSection);
    
    return courseSection;
  }
  async updateOrder(newOrder: string[]) {
    let updatedSections = []
    for (let index = 0; index < newOrder.length; index++) {
      const id = newOrder[index];
      const courseSection = await this.findOne(id);
      if (!courseSection) throw new NotFoundException(`Course Section with ID ${id} couldn't be found`);
      courseSection.order = index;
      updatedSections.push(courseSection);
    }
    await this.courseSectionRepository.getEntityManager().flush();
    
    return updatedSections
  }

  async remove(id: string) {
    try {
      const courseSection = await this.findOne(id);
      if (!courseSection) throw new NotFoundException(`CourseSection could not be found`);
      return await this.courseSectionRepository.getEntityManager().removeAndFlush(courseSection);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while deleting the courseSection');
    }
  }
}
